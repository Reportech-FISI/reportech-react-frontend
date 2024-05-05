# Reportech FISI

<div align="center">
    <img src="src/assets/IamProgrammer!.png" height="200">
</div>

Technical support ticket management system that uses data structures and algorithms to efficiently manage user support requests. This system will allow users to report technical problems, assign tasks to specialized technicians, and track the status and resolution of incidents.

## Stack

- Typescript
- React
- Tailwind
- ESLint
- Prettier

## Getting started

### To install dependencies and run the project

- Run `npm install`
- Add `.env` file if necessary
- Run `npm run dev`

### Scripts

| Script       | Description                        |
| ------------ | ---------------------------------- |
| npm dev      | Runs the application.              |
| npm build    | Create builds for the application. |
| npm preview  | Runs the Vite preview              |
| npm lint     | Display eslint errors              |
| npm lint:fix | Fix the eslint errors              |
| npm format   | Runs prettier for all files        |
| npm test     | Run tests                          |

## Routes

- Login page: `/login`, file path `src/pages/login/Login.tsx`
- Registers page: `/registers`, file path `src/pages/registers/Registers.tsx`
- Register details page: `/details/:registerId`, file path `src/pages/registers/RegisterDetails.tsx`
- Add register page: `/add/register`, file path `src/pages/registers/SaveRegister.tsx`
- Edit register page: `edit/:registerId`, file path `src/pages/registers/SaveRegister.tsx`
- Add user page: `add/user`, file path `src/pages/admin/SaveUser.tsx`
- Edit user page: `edit/:userId`, file path `src/pages/admin/SaveUser.tsx`

## Implementations

### Data Structures

| Data structure           | Description                                                                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Binary Search Tree (BST) | Used to organize and maintain ticket information, allowing efficient search, insert and delete operations.                         |
| Graph                    | Used to represent complex relationships between support tickets and system components, facilitating diagnosis and troubleshooting. |
| Hash Table               | Used to store records of users, technicians and ticket details, allowing quick and efficient access to information.                |
| Linked List              | Used to record and maintain a detailed history of updates and actions taken on each support ticket.                                |
| Priority Queue (Heap)    | Used to manage the priority of support tickets and allocate resources efficiently.                                                 |

### Algorithms

| Algorithms                | Description                                                                                                                                  |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Task Assignment Algorithm | Used to automatically assign support tickets to available and trained technicians.                                                           |
| Search Algorithm          | Used to quickly search for tickets by ID number, user or status.                                                                             |
| Sorting Algorithm         | Se utiliza para almacenar registros de usuarios, técnicos y detalles de los tickets, permitiendo un acceso rápido y eficaz a la información. |
| Troubleshooting Algorithm | Used to diagnose complex technical problems through network or system analysis.                                                              |
| Notification Algorithm    | Used to send automatic notifications to users and technicians about changes in ticket status.                                                |

#### Made with <3 by UNMSM
