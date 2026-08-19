import {
    Student,
    StudentInput,
    StudentPartialInput
} from '../models/StudentModel';
import { pool } from '../config/database';

export interface StudentRepository {
    findAll(): Promise<Student[]>;
    findById(id: number): Promise<Student | undefined>;
    create(data: StudentInput): Promise<Student>;
    replace(id: number, data: StudentInput): Promise<Student | null>;
    update(id: number, data: StudentPartialInput): Promise<Student | null>;
    remove(id: number): Promise<boolean>;
}

class PostgreSQLStudentRepository implements StudentRepository {

    async findAll(): Promise<Student[]> {
        const result = await pool.query(
            `SELECT
                id,
                last_name AS "lastName",
                first_name AS "firstName",
                email,
                major,
                state
             FROM students
             ORDER BY id`
        );

        return result.rows;
    }

    async findById(id: number): Promise<Student | undefined> {
        const result = await pool.query(
            `SELECT
                id,
                last_name AS "lastName",
                first_name AS "firstName",
                email,
                major,
                state
             FROM students
             WHERE id = $1`,
            [id]
        );

        return result.rows[0];
    }

    async create(data: StudentInput): Promise<Student> {
        const result = await pool.query(
            `INSERT INTO students
                (last_name, first_name, email, major, state)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING
                id,
                last_name AS "lastName",
                first_name AS "firstName",
                email,
                major,
                state`,
            [
                data.lastName,
                data.firstName,
                data.email,
                data.major,
                data.state
            ]
        );

        return result.rows[0];
    }

    async replace(
        id: number,
        data: StudentInput
    ): Promise<Student | null> {

        const result = await pool.query(
            `UPDATE students
             SET
                last_name = $1,
                first_name = $2,
                email = $3,
                major = $4,
                state = $5
             WHERE id = $6
             RETURNING
                id,
                last_name AS "lastName",
                first_name AS "firstName",
                email,
                major,
                state`,
            [
                data.lastName,
                data.firstName,
                data.email,
                data.major,
                data.state,
                id
            ]
        );

        return result.rows[0] ?? null;
    }

    async update(
        id: number,
        data: StudentPartialInput
    ): Promise<Student | null> {

        const fields: string[] = [];
        const values: unknown[] = [];
        let parameterIndex = 1;

        if (data.lastName !== undefined) {
            fields.push(`last_name = $${parameterIndex++}`);
            values.push(data.lastName);
        }

        if (data.firstName !== undefined) {
            fields.push(`first_name = $${parameterIndex++}`);
            values.push(data.firstName);
        }

        if (data.email !== undefined) {
            fields.push(`email = $${parameterIndex++}`);
            values.push(data.email);
        }

        if (data.major !== undefined) {
            fields.push(`major = $${parameterIndex++}`);
            values.push(data.major);
        }

        if (data.state !== undefined) {
            fields.push(`state = $${parameterIndex++}`);
            values.push(data.state);
        }

        if (fields.length === 0) {
            return this.findById(id).then(student => student ?? null);
        }

        values.push(id);

        const result = await pool.query(
            `UPDATE students
             SET ${fields.join(', ')}
             WHERE id = $${parameterIndex}
             RETURNING
                id,
                last_name AS "lastName",
                first_name AS "firstName",
                email,
                major,
                state`,
            values
        );

        return result.rows[0] ?? null;
    }

    async remove(id: number): Promise<boolean> {
        const result = await pool.query(
            `DELETE FROM students
             WHERE id = $1`,
            [id]
        );

        return (result.rowCount ?? 0) > 0;
    }
}

export const studentRepository: StudentRepository =
    new PostgreSQLStudentRepository();