pipeline {
    agent { docker "node:lts-alpine"}
    stages {
        stage('Test') { 
            steps {
                sh '''
                npm install
                npm run coverage
                npm run test:api
                '''
            }
        }
    }
}
