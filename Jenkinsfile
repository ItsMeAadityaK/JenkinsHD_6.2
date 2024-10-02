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
                // Start the application in a new terminal
                    bat 'start cmd /c "npm start"'

                    // Run Selenium tests in a separate terminal
                    bat 'start cmd /c "node App.test.js"'

                    // Wait for a few seconds using sleep
                    sleep(time: 10, unit: 'SECONDS')
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
