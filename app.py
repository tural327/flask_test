import pandas as pd
import plotly.graph_objs as go
from flask import Flask, render_template, request,make_response
import time
import json
import subprocess


#subprocess.Popen(["python", "test1.py"])

CSV_FILE = "sensor_data.csv"

app = Flask(__name__)

def create_plot(x, y, title):
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=x, y=y, mode='lines+markers', name=title))
    fig.update_layout(title=title, xaxis_title='Date', yaxis_title=title)
    return fig.to_html(full_html=False)

@app.route('/')
def home():
    return render_template('index.html')



@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        if username == 'admin' and password == 'admin12345':
            #df = pd.read_csv('sensor_data_first.csv')
            #df1 = df.dropna()
            #x = df1['time']
            return render_template('new_chart.html', username=username)
        else:
            return render_template('error.html', username=username)
    
    return render_template('login2.html')


@app.route('/data')
def data():


    df = pd.read_csv(CSV_FILE)
    df1 = df.dropna()

    data = df1[['timestamp', 'temperature', 'vibration_level','power_consumption','pressure','material_flow_rate','cycle_time','error_rate','downtime','maintenance_flag','efficiency_score','production_status']].values.tolist()
   # with open('test.json', 'r') as f:
    #    data = json.load(f)
    response = make_response(json.dumps(data))
    response.content_type = 'application/json'


    return response

if __name__ == '__main__':
    app.run(debug=True)
