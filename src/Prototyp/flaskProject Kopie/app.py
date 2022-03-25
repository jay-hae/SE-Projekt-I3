import os, Login, Querries
#### os : When Python starts, it loads many modules into sys. module.os module is also loaded when Python starts. It assigns its path to the os specific module attribute.
#### Login : imports Login.py File

#### Erklärung Flask: https://flask.palletsprojects.com/en/2.0.x/quickstart/
from flask import Flask, render_template, request, session, url_for, jsonify, send_from_directory
from flask_wtf import CSRFProtect
from werkzeug.utils import redirect

#### Spezialvariable "__name__" =  https://www.pythontutorial.net/python-basics/python-__name__/#:~:text=The%20__name__%20is,file%20associated%20with%20the%20module.
app = Flask(__name__)
app.secret_key = os.urandom(24)


# Login Page, atm login with db credentials
# redirect user to homepage if he is already logged in

#### app.route = We use the route() decorator to tell Flask what URL should trigger our function.
@app.route('/', methods=['GET', 'POST'])
def LoginPage():
    if request.method == 'GET':
        session["usr"] = 'yes'
        return redirect('/homepage/institutes')
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


# return of filter objects
""""@app.route('/get/<name>', methods=['GET'])
def load_filter(name):
    if name == 'institutes':
        return Querries.institutes_ret()
    elif name == 'agreements':
        return Querries.ag_type_ret()
    elif name == 'countries':
        return Querries.all_countries()
    elif name == 'fac':
        return Querries.faculty()
    else: return None"""


@app.route('/getInstitutes', methods=['GET'])
def ret_inst():
    return Querries.institutes_ret()


@app.route('/getAgreement', methods=['GET'])
def ret_type():
    return Querries.ag_type_ret()


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
        return Querries.for_modal(request.form['id'])
    else:
        redirect(url_for('LoginPage'))


# give browser all files that are needed (js files,...)
@app.route('/<string:filename>', methods=['GET'])
def ret_file(filename):
    return send_from_directory('templates', filename)


# handle institute that should get added
# return a value to let js script know if insert was successful
@app.route('/addInstitute', methods=['POST'])
def new_institute():
    if request.method == 'POST':
        my_var = request.form.to_dict()
        # for insert into tbl_institute
        col_list_institute = []
        val_list_institute = []
        if "display" not in request.form:
            col_list_institute.append("display")
            val_list_institute.append(0)
        for key in my_var:
            if key != 'partnership_type_ID':
                if my_var[key] != '':
                    if key == 'eng':
                        name = my_var[key]
                    if my_var[key] == 'on':
                        col_list_institute.append(key)
                        val_list_institute.append(int(1))
                    elif my_var[key].isnumeric():
                        val_list_institute.append(int(my_var[key]))
                        col_list_institute.append(key)
                    else:
                        val_list_institute.append(my_var[key])
                        col_list_institute.append(key)
            else:
                val = my_var[key]
        return Querries.new_Institute(col_list_institute, val_list_institute, name, val)
    return redirect(url_for('LoginPage'))


@app.route('/filterInstitute', methods=['POST'])
def handle_filter():
    if request.method == 'POST':
        my_list = request.form.values()
        var = ['%' if i == 'none' else i for i in my_list]
        return Querries.filter_institutes(var)


@app.route('/editInstitute', methods=['POST'])
def edit_inst():
    return 'HI'


""""@app.route('changeData/<name>', methods=['POST'])
def changes(name):
    if name == 'add':

    elif name == '':

    else:
    return redirect(url_for('LoginPage'))
"""


@app.route('/homepage/<name>', methods=['GET', 'POST'])
def hp_file(name):
    if name == 'mentor':
        return render_template('mentor.html')
    elif name == 'countries':
        return render_template('country.html')
    elif name == 'courses':
        return render_template('course.html')
    elif name == 'faculties':
        return render_template('faculty.html')
    elif name == 'institutes':
        return render_template('universities.html')


@app.route('/loader/<name>', methods=['GET', 'POST'])
def ret_js(name):
    if name == 'mentor':
        return Querries.return_mentor()
    elif name == 'country':
        return Querries.return_countries()
    elif name == 'course':
        return Querries.return_courses()
    elif name == 'faculty':
        return Querries.return_faculties()
    elif name == 'mobAgreements':
        return Querries.get_ma(request.form['id'])
    else:
        return jsonify('answer: Unexpected Request')


if __name__ == '__main__':
    app.run(debug=True)
