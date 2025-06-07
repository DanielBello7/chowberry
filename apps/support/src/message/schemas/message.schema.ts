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

@Entity({ name: 'messages' })
export class MessageSchema implements Message {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  _id: string;
  @Column({ type: 'uuid' })
  account: string;
  @Column({ type: 'varchar' })
  body: string;
  @Column({ type: 'varchar', nullable: true })
  media: string | undefined;
  @Column({ type: 'varchar', nullable: true, name: 'media_type' })
  mediaType: string | undefined;
  @Column({ type: 'uuid' })
  ticket: string;
  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: string;
  @Column({ type: 'timestamp', name: 'updated_at' })
  updatedAt: string;
  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
    name: 'deleted_at',
  })
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
