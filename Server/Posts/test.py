from dotenv import load_dotenv
load_dotenv()
import os
# os.environ['HUGGINGFACEHUB_API_TOKEN'] = "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"

from langchain.llms import HuggingFaceHub
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

repo_id = "tiiuae/falcon-7b-instruct"

def getMail(question):
    template = """You are an expert professional mail writer, which returns pure text. Write a mail (specificaly the body) to Public Works Department for this description of the problem:
    problem: {question}

    Also make sure to replace the 'YOUR NAME' with your 'E-Samasya Team' at the end. and not to enter the subject in the mail. [IMP]
    """

    prompt = PromptTemplate(template=template, input_variables=["question"])

    llm = HuggingFaceHub(
        repo_id=repo_id, model_kwargs={"temperature": 0.5, "max_length": 64}
    )
    llm_chain = LLMChain(prompt=prompt, llm=llm)
    response = llm_chain.run(question)
    response = response[:-11]+'E-Samasya Team'

    # get subject of this mail too
    template2 = """what is a good subject for this mail:
    query: {question}

    make sure not to write a mail but only the subject in single line without any extra additions. [IMP]
    """
    prompt2 = PromptTemplate(template=template2, input_variables=["question"])
    llm_chain_2 = LLMChain(prompt=prompt2, llm=llm)
    subject = llm_chain_2.run(question)
    subject = subject.split("\n")[1][9:]
    return [response,subject]

def sendMail(subject,body):
    import smtplib
    from email.mime.text import MIMEText

    subject = subject
    body = body
    sender = "arnavkohli321@gmail.com"
    recipients = ["ymathur123@gmail.com","architkohli321@gmail.com"]
    password = os.environ.get('EMAIL_PASSWORD')
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = sender
    msg['To'] = ', '.join(recipients)
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp_server:
       smtp_server.login(sender, password)
       smtp_server.sendmail(sender, recipients, msg.as_string())
    print("Message sent!")
    return True

def Gmailer(question):
    out1,out2 = getMail(question)
    sendMail(out2,out1)
    return True

