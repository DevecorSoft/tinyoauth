pipeline {
    agent { docker "node:lts-alpine"}
    stages {
        stage('Test') { 
            steps {
                sh "npm install"
                sh "npm run test:unit"
                sh "npm run test:api"
            }
        }
    }
}
