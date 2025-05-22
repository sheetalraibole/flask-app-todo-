pipeline{
   agent any
   environment{
      EMAIL_RECIPIENTS = 'syedabrarali346@gmail.com'
   }
   stages{
     stage("build"){
       steps {
           echo "sucess"  
         }
     }
     stage("test"){
       steps {
          echo "test"
         }
     }
     stage("artifacts"){
       steps {
          echo "ecr"
         }
     }
     stage("deploy"){
       steps {
         echo "deploy"
         }
     }
   }
   post{
      always{
        emailext(
                to: EMAIL_RECIPIENTS,
                subject: "Deployment Status: ${currentBuild.currentResult}",
                body: """
                Deployment Report
                ----------------
                Job: ${env.JOB_NAME}
                Build: ${env.BUILD_NUMBER}
                Status: ${currentBuild.currentResult}
                URL: ${env.BUILD_URL}
                Duration: ${currentBuild.durationString}
                """
            )
         cleanWs()
      }
   }
}
