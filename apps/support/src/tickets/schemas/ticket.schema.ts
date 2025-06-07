import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Ticket } from '../entities/ticket.entity';
import { TICKET_STATUS_ENUM } from '@app/enums/ticket.enum';
import { MessageSchema } from '../../message/schemas/message.schema';

@Entity()
export class TicketSchema implements Ticket {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ type: 'varchar' })
  subject: string;

  @Column({ type: 'varchar', nullable: true })
  body: string | undefined;

  @Column({ type: 'varchar', nullable: true })
  admin: string | undefined;

  @Column({ type: 'uuid' })
  account: string;

  @Column({
    type: 'varchar',
    enum: TICKET_STATUS_ENUM,
    default: TICKET_STATUS_ENUM.PENDING,
  })
  status: TICKET_STATUS_ENUM;

  @Column({ type: 'uuid', nullable: true })
  lastMessage: string | undefined;

  @Column({ type: 'timestamp' })
  createdAt: string;

  @Column({ type: 'timestamp' })
  updatedAt: string;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: string | undefined;

  @OneToMany(() => MessageSchema, (message) => message.ticket)
  Messages: Relation<MessageSchema[]>;

  @OneToOne(() => MessageSchema, { nullable: true })
  @JoinColumn()
  LastMessage: MessageSchema | undefined;

  @BeforeUpdate()
  updated() {
    this.updatedAt = new Date().toString();
  }

  @BeforeInsert()
  defaults() {
    this.createdAt = new Date().toString();
    this.updatedAt = new Date().toString();
    this.Messages = [];
    this.lastMessage = this.lastMessage ?? undefined;
    this.LastMessage = undefined;
  }
}
