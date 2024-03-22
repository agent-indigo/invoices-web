# Invoices (QAP 3)

## Semester 3

## Full Stack JavaScript & Database

## Braden Hynes

## Description

A simple invoice manager built on the PERN stack using Sequelize, Bootstrap, and Redux Toolkit.

## User Roles

- Root: Can do everything but delete itself and reset its password without providing its current one.

- User: Can only perform CRUD ops on invoices.

## Setup

- Create a new SQL database and leave it empty.

- Copy `environmentTemplate.txt` to `.env` and fill in the values.

- Start the application and server simultaneously by running `npm run stack`.

- When running the application for the first time, you will be prompted to create a password for `root`.

- The SQL schema will synchronize automatically every time you start the server.
