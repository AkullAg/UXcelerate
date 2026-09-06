# UXcelerate!

Rescue Robots Management Interface

An interactive disaster response command center interface to control rescue robots during an earthquake for a search and rescue operation. 
The interface provides the operators with a live map showing locations of the robots, hazards that have been found, survivors that have
been located, a right panel that shows detailed information about survivors and allows for further planning decisions made by the robots
in case of uncharted/inaccessible routes, the left panel that shows the robot fleet and allows for direct management of all robots also
showing the signal strengths of each robot, where it has been deployed and to what task and last but not least features live activity feed
to review various completed or ongoing tasks and actions performed by the operator.

## Tech Stack

1. TypeScript

2. HTML

3. CSS

4. Vite.js

5. Javascript

6. JSON


## Features 

1. Live disaster response map
2. Rescue robot fleet monitoring
3. Priority alerts and hazards
4. Survivor detection and tracking
5. Battery and robot status monitoring
6. Live mission activity timeline
7. Robot communication status

## How to run Locally

1. Clone repository
2. Use the command cd DisasterManagementDashboard
3. Run npm install , install node.js first if not yet installed on the computer
4. Use the command npm run dev in the local terminal
5. Open the website on local host

## Hosted Vercel Domain

https://rescuerobotinterface.vercel.app/

## Development

1. Vite.js has been used so that changes made to the code can be previewed instantly live and for basic optimizations.
2. The file structure has been divided into various reusable components in order to make more pages if necessary.
3. typescript has been used for the logic and for the react UI components
4. CSS describes how everything looks
5. JSON handles the project configuration and dependencies 

## Project Structure
```
DisasterManagementDashboard/
│
├── dist/
|
├── node_modules/             # Installed project dependencies
|
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── AlertsPanel.tsx
│   │   ├── FleetPanel.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── MapArea.tsx
│   │   ├── ResizeHandle.tsx
│   │   └── RobotDrawer.tsx
│   ├── App.tsx               # Main application component
│   ├── data.ts               # robot data
│   ├── index.css             # styling
│   ├── main.tsx              # main entry
│   ├── types.ts              # TypeScript type definitions
│   ├── utils.ts              # Shared utility functions
│   └── vite-env.d.ts         # Vite/TypeScript environment definitions
├── .gitattributes           
├── .gitignore                # Files excluded from Git
├── .mise.toml                # Development tool/version configuration
├── index.html                # HTML
├── package.json              # Dependencies and npm scripts
├── package-lock.json         # Locked dependency versions
├── pnpm-lock.yaml            # pnpm dependency lockfile (needed for vercel hosting here)
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
└── README.md                 # Project documentation
```
