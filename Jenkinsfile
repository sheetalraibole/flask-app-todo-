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
         script{
                def buildInfo = [
                    "Job Name"    : env.JOB_NAME,
                    "Build Number": env.BUILD_NUMBER,
                    "Build Status": currentBuild.currentResult,
                    "Build URL"   : env.BUILD_URL,
                    "Duration"    : currentBuild.durationString
                ]
              def emailBody = """
                <h1>Deployment Report</h1>
                <ul>
                    ${buildInfo.collect { "<li><b>${it.key}:</b> ${it.value}</li>" }.join('\n')}
                </ul>
                """
         emailext(subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}",
                body: emailBody,
                to:EMAIL_RECIPIENTS,
                recipientProviders: [[$class: 'DevelopersRecipientProvider']]
                 )
         cleanWs()
         }
      }
   }
}
