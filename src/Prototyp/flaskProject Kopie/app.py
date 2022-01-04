import os, Login

from flask import Flask, render_template, request, session, url_for, jsonify, send_from_directory
from flask_wtf import CSRFProtect
from werkzeug.utils import redirect

import Querries

app = Flask(__name__)
app.secret_key = os.urandom(24)


@app.route('/', methods=['GET', 'POST'])
def LoginPage():
    if request.method == 'GET':
        return render_template('index.html')
    else:
        if "usr" in session:
            return redirect(url_for('sql'))
        else:
            session["usr"] = Login.LoginDB(request.form["usr"], request.form["pwd"])
            return redirect(url_for('sql'))


@app.route('/sql', methods=['GET', 'POST'])
def sql():
    if request.method == 'GET':
        return render_template('universities.html')


@app.route('/getInstitutes', methods=['GET'])
def ret_inst():
    return Querries.institutes_ret()


@app.route('/loadCountries', methods=['GET'])
def ret_countries():
    return Querries.all_countries()


@app.route('/loadFac', methods=['GET'])
def ret_fac():
    return Querries.faculty()


@app.route('/openModal', methods=['POST']) #send data for modalbox
def exec_sp():
    return Querries.mod_box(request.form['id'])


@app.route('/<string:filename>', methods=['GET'])
def lol(filename):
    return send_from_directory('templates', filename)


@app.route('/addInstitute', methods=['POST'])
def new_institute():
    if "usr" in session:
        if not request.form['show'] == "":
            val_show = True
        else:
            val_show = False
        add_inst_dict = {
            'country': request.form['country'],
            'eng': request.form['eng'],
            'local': request.form['loc'],
            'adr': request.form['adr'],
            'ws': request.form['website'],
            'note': request.form['note'],
            'show': val_show,
            'erasmus': request.form['erasmus'],
        }
        #check if institute was successfull added to db
        if Querries.new_Institute(add_inst_dict):
            success = True
        else:
            success = False
    else:
        return redirect(url_for(LoginPage))

if __name__ == '__main__':
    app.run()