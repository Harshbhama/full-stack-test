**Image Upload Platform** 

**Tech Used**
Frontend - NextJs, Typescript, React-Query, Tailwind css
Backend - NodeJs, ExpressJs, Prisma ORM, Postgresql, Bull (Queues and Jobs), Node-Scheduler (cron jobs), Jimp Module (Image processing)
Deployments - Amazon ec2, Docker
**Features**
- Api security using JWT Token authentication, HTTP only cookie based token storage, Input validators using validator module.
- Queue based approach using Bull and Redis. User specific queue creation for optimal efficiency.
- Image processing to convert image into png, with 400x400 resolution.
- Cron jobs to schedule uploads using node-schedular module. It adds to queue as well.
- Prisma ORM connected with Postgres for optimal medadata storage.
- Deployment using Docker Compose Image Strategy (included Backend and Frontend docker files along with compose.yml)
**Setup**
- Clone the repository using git link.
- If docker is installed, run commands - [docker compose build, docker compose up]
- If docker is not installed, run - node index.js (backend), npm run dev (frontend)
- .env.local(frontend) - NEXT_PUBLIC_BACKEND_URL
- .env(backend)-
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
TOKEN_KEY="abc1234"
**Functionality for Queue and Cron jobs**
Backend -
As soon as the project starts, first server checks for the available registered users, then it creates user specific queues.
If a new user is registered, a seperate queue is created for that user as well.
Upload feature inputs Date and Time, by comparing current Date/Time, we check if it needs to uploaded via quere or needs to be scheduled.
Based on the condition image is either uploaded or scheduled.

**Demo**
- http://15.206.82.156:3000/ - https://www.loom.com/share/12cec3081df64ed0a9632e32e66f1ea9
