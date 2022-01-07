import os, Login

from flask import Flask, render_template, request, session, url_for, jsonify, send_from_directory
from flask_wtf import CSRFProtect
from werkzeug.utils import redirect

import Querries

app = Flask(__name__)
app.secret_key = os.urandom(24)


# Login Page, atm login with db credentials
# redirect user to homepage if he is already logged in
@app.route('/', methods=['GET', 'POST'])
def LoginPage():
    if request.method == 'GET':
        session["usr"] = 'yes'
        return redirect(url_for('sql'))
    """
    if request.method == 'GET':
        if "usr" in session:
            return redirect(url_for('sql'))
        else:
            return render_template('index.html')
    else:
        session["usr"] = Login.LoginDB(request.form["usr"], request.form["pwd"])
        return redirect(url_for('sql'))
"""


# show user homepage
# insight into every institute in tbl + opportunity to add institute
@app.route('/sql', methods=['GET'])
def sql():
    if "usr" in session:
        return render_template('universities.html')
    else:
        return redirect(url_for('LoginPage'))


# DB call to get data from institute table
@app.route('/getInstitutes', methods=['GET'])
def ret_inst():
    return Querries.institutes_ret()


# DB call load all countries
@app.route('/loadCountries', methods=['GET'])
def ret_countries():
    if "usr" in session:
        return Querries.all_countries()
    else:
        return redirect(url_for('LoginPage'))


# DB call load faculties
@app.route('/loadFac', methods=['GET'])
def ret_fac():
    if "usr" in session:
        return Querries.faculty()
    else:
        redirect(url_for('LoginPage'))


# get data needed for modal
# filtered institute id from website
@app.route('/openModal', methods=['POST'])
def exec_sp():
    if "usr" in session:
        return Querries.for_modal(request.form['eng'])
    else:
        redirect(url_for('LoginPage'))


# give browser all files that are needed (js files,...)
@app.route('/<string:filename>', methods=['GET'])
def lol(filename):
    return send_from_directory('templates', filename)


# handle institute that should get added
# return a value to let js script know if insert was successful
@app.route('/addInstitute', methods=['POST'])
def new_institute():
    if request.method == 'POST':
        if "usr" in session:
            if "mod_anz" in request.form:
                show = True
            else:
                show = False
            # create dict with data from post request
            add_inst_dict = {
                'country': request.form['mod_country'],
                'eng': request.form['mod_eng'],
                'local': request.form['mod_local'],
                'adr': request.form['mod_adr'],
                'ws': request.form['mod_ws'],
                'note': request.form['mod_ntzn'],
                'erasmus': request.form['mod_ec']
            }
            # check if institute was successful added to db
            if Querries.new_Institute(add_inst_dict):
                return jsonify('success')
            else:
                return jsonify('failed')
        else:
            return redirect(url_for('LoginPage'))


if __name__ == '__main__':
    app.run()