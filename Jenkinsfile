pipeline {
    agent any

    environment {
        NETLIFY_AUTH_TOKEN = 'nfp_oufca8kT2AFY6WRShNV1qDoHFeL5JJaf3a09'
        SITE_ID = '4e5d6b28-0fe9-44a6-810c-36d4e385fa8d'
    }

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
/*
        stage('Docker Build') {
            steps {
                // Build the React project
                bat 'docker build -t react-app:latest .'
            }
        }*/

        stage('Test') {
            steps {
                // Start the application in the background
                bat 'start /b npm start'

                // Wait for the app to start
                sleep(time: 10, unit: 'SECONDS')

                // Run Selenium tests
                bat 'node Selenium.test.js' // Adjust with your actual test file name
            }
        }

        stage('Release to Netlify') {
            steps {
                script {
                    echo 'Deploying to Netlify...'
                    bat "npm run build"
                    bat "npx netlify deploy --dir=./build --prod --auth=${NETLIFY_AUTH_TOKEN} --site=${SITE_ID}"
                }
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
