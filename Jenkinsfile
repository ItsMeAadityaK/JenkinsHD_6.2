pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/ItsMeAadityaK/JenkinsHD_6.2.git', branch: 'master'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node.js and npm dependencies
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                // Build the React project
                bat 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                // Build the React project
                bat 'docker build -t react-app:latest .'
            }
        }

        stage('Test') {
            steps {
                // Start the application in the background
                bat 'start /b npm start'

                // Wait for the app to start
                sleep(time: 10, unit: 'SECONDS')

                // Run Selenium tests
                bat 'node seleniumTest.js' // Adjust with your actual test file name
            }
        }

        stage('Deploy') {
            steps {
                // Deploy to a server or hosting (e.g., AWS S3, Netlify, etc.)
                echo 'Deploying the app...'
                // For example, you could use AWS CLI or any hosting provider’s CLI here.
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
