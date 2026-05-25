import pool from "../core/db.js";

// Save a job (create bookmark)
export const saveBookmark = async (userId, jobId) => {
  const result = await pool.query(
    `INSERT INTO bookmarks (user_id, job_id)
     VALUES ($1, $2)
     RETURNING *`,
    [userId, jobId]
  );
  return result.rows[0];
};

// Get all bookmarks for a user with full job details
export const getBookmarks = async (userId) => {
  const result = await pool.query(
    `SELECT b.id AS bookmark_id, b.created_at AS bookmarked_at,
            j.id AS job_id, j.title, j.description, j.location,
            j.industry, j.salary, j.job_type, j.deadline, j.created_at,
            u.name AS employer_name
     FROM bookmarks b
     JOIN jobs j ON b.job_id = j.id
     JOIN users u ON j.employer_id = u.id
     WHERE b.user_id = $1
     ORDER BY b.created_at DESC`,
    [userId]
  );
  return result.rows;
};

// Find a single bookmark by user and job
export const findBookmark = async (userId, jobId) => {
  const result = await pool.query(
    `SELECT * FROM bookmarks WHERE user_id = $1 AND job_id = $2`,
    [userId, jobId]
  );
  return result.rows[0];
};

// Unsave a job (delete bookmark)
export const deleteBookmark = async (userId, jobId) => {
  await pool.query(
    `DELETE FROM bookmarks WHERE user_id = $1 AND job_id = $2`,
    [userId, jobId]
  );
};