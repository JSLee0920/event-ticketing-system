pipeline {
    agent {
        kubernetes {
            yaml '''
            apiVersion: v1
            kind: Pod
            spec:
              containers:
              - name: maven
                image: maven:3.9.6-eclipse-temurin-21
                command:
                - cat
                tty: true
            '''
        }
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build & Run Tests') {
            steps {
                container('maven') {
                    echo 'Injecting secure PEM files and compiling code...'

                    // Fetch both files from the Jenkins vault simultaneously
                   withCredentials([
        file(credentialsId: 'jwt-private-key', variable: 'JWT_PRIVATE_KEY_PATH'),
        file(credentialsId: 'jwt-public-key', variable: 'JWT_PUBLIC_KEY_PATH')
        ]) {
            // Using ''' allows us to run multiple Linux commands in the exact same secure session
            sh '''
                echo "Setting execution permissions for Maven wrapper..."
                chmod +x mvnw

                echo "Running Maven build..."
                ./mvnw clean package -Djwt.private.key=file:$JWT_PRIVATE_KEY_PATH -Djwt.public.key=file:$JWT_PUBLIC_KEY_PATH
            '''
        }
                }
            }
            post {
                always {
                    junit 'target/surefire-reports/*.xml'
                }
                success {
                    archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
                }
            }
        }
    }
}