# Waywin - Online Trainer Time Slot Booking Platform
Waywin is an online platform designed for trainers, including psychologists, career guidance counselors, motivational speakers, and more. Trainers can create profiles, upload their available time slots, and users can verify and book appointments with trainers who meet their requirements. The platform is divided into three main modules: user, trainer, and admin.


## 🚀 Features
- **Responsive Design:** The frontend is built using ***React*** and ***Tailwind CSS***, ensuring a responsive and user-friendly experience.

- **Dark and Light Modes:** Users can switch between dark and light modes based on their preferences.

- **Real-time Chat:** The platform offers real-time chat functionality using ***Socket.io*** for communication between users and trainers.

- **Type Safety:** ***TypeScript*** is used in both the front-end  to ensure type security throughout the platform



## Installation

### To run the frontend locally, follow these steps:

#### Step 1: Clone this Git repository.
```bash
  git clone https://github.com/musaffarulislam/waywin-frontend.git
```
#### Step 2: Navigate to the Project Directory
```bash
  cd waywin-frontend
```
#### Step 3: Install Global Dependencies
```bash
    yarn global add nodemon
```

#### Step 4: Install Local Dependencies
```bash
    yarn install
```
#### Step 5: Run frontend
```bash
   yarn dev
```
    ## CI/CD Pipeline

### Continuous Integration (CI)

The frontend has an automated CI/CD pipeline set up for continuous integration and continuous deployment. Here's how it works:

- **GitHub Actions:** Our CI pipeline is managed using GitHub Actions, a powerful automation platform. Every time changes are pushed to the repository, GitHub Actions automatically triggers a series of predefined workflows.

- **Testing:** During the CI process, automated tests are executed to ensure that the code meets quality and functionality standards. This includes unit tests, integration tests, and end-to-end tests.

- **Code Analysis:** We use static code analysis tools to check for code style and potential issues, ensuring high code quality.

### Continuous Deployment (CD)

After successful CI, the CD part of the pipeline takes over:

- **AWS IAM Service:** AWS IAM (Identity and Access Management) is utilized to securely manage access to AWS resources during the deployment process. It ensures that the deployment process is both secure and efficient.

- **Deployment to AWS S3 and CloudFront:** The frontend is hosted on AWS S3, a scalable object storage service, and content is distributed using AWS CloudFront for low-latency access. Deployment is automated, meaning that any approved changes are automatically deployed to our production environment.
