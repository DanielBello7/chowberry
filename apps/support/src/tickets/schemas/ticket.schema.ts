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

@Entity({ name: 'tickets' })
export class TicketSchema implements Ticket {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
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

  @Column({ type: 'uuid', nullable: true, name: 'last_message' })
  lastMessage: string | undefined;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: string;

  @Column({ type: 'timestamp', name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
    name: 'deleted_at',
  })
  deletedAt: string | undefined;

  @OneToMany(() => MessageSchema, (message) => message.Ticket)
  Messages: Relation<MessageSchema[]>;

  @OneToOne(() => MessageSchema, { nullable: true })
  @JoinColumn({ name: 'last_message' })
  LastMessage: Relation<MessageSchema>;

  @BeforeUpdate()
  updated() {
    this.updatedAt = new Date().toString();
  }

  @BeforeInsert()
  defaults() {
    this.createdAt = new Date().toString();
    this.updatedAt = new Date().toString();
    this.Messages = [];
  }
}
