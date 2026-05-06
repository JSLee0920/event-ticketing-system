pipeline {
    agent {
        kubernetes {
            yaml '''
            apiVersion: v1
            kind: Pod
            spec:
              containers:
              - name: maven
                image: maven:3.9.6-eclipse-temurin-17
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
                    echo 'Compiling code and running JUnit tests...'
                    // 'package' runs the tests and builds the .jar file
                    sh 'mvn clean package'
                }
            }
            // This runs after the build stage finishes
            post {
                always {
                    //  Read the XML test reports Maven generated and build a UI dashboard
                    junit 'target/surefire-reports/*.xml'
                }
                success {
                    //  save it to the Jenkins controller
                    archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
                }
            }
        }
    }
}