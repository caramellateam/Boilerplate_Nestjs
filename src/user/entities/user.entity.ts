/* eslint-disable indent */
import {
  Column, CreateDateColumn, Entity,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
// 이벤트 / 공자사항 / 뉴레터
// 제목 / 글 / 첨부파일 / 이미지 첨부 / 댓글

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'char',
    length: 255,
    unique: true,
    nullable: false,
    update: false,
    select: true,
    comment: 'email',
  })
  email!: string;

  @Column({
    type: 'char',
    length: 100,
    unique: false,
    nullable: false,
    update: true,
    select: true,
    comment: '성명',
  })
  name!: string;

  @Column({
    type: 'char',
    length: '512',
    unique: false,
    nullable: false,
    update: true,
    select: false,
    comment: '해쉬값',
  })
  hash!: string;

  @Column({
    type: 'char',
    length: '350',
    unique: false,
    nullable: false,
    update: true,
    select: false,
    comment: '솔트값',
  })
  salt!: string;

  @CreateDateColumn({
    comment: 'createdAt',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    comment: 'updatedAt',
  })
  updatedAt!: Date;
}
