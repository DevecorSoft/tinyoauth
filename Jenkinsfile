pipeline {
    agent { docker "node:lts-alpine"}
    stages {
        stage('Test') { 
            steps {
                sh "npm install"
                sh "npm run coverage"
                sh "npm run test:api"
            }
        }
    }
}
