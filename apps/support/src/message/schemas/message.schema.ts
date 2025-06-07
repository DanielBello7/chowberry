import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Message } from '../entities/message.entity';
import { TicketSchema } from '../../tickets/schemas/ticket.schema';

@Entity()
export class MessageSchema implements Message {
  @PrimaryGeneratedColumn('uuid')
  _id: string;
  @Column({ type: 'uuid' })
  account: string;
  @Column({ type: 'varchar' })
  body: string;
  @Column({ type: 'varchar', nullable: true })
  media: string | undefined;
  @Column({ type: 'varchar', nullable: true })
  mediaType: string | undefined;
  @Column({ type: 'uuid' })
  ticket: string;
  @Column({ type: 'timestamp' })
  createdAt: string;
  @Column({ type: 'timestamp' })
  updatedAt: string;
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: string;

  @ManyToOne(() => TicketSchema, (ticket) => ticket.Messages)
  @JoinColumn({ name: 'ticket' })
  Ticket: Relation<TicketSchema>;

  @BeforeUpdate()
  updated() {
    this.updatedAt = new Date().toString();
  }

  @BeforeInsert()
  defaults() {
    this.createdAt = new Date().toString();
    this.updatedAt = new Date().toString();
  }
}
