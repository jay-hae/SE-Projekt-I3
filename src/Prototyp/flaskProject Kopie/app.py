
from functools import wraps

from flask import Flask, make_response, render_template, request, session, url_for, jsonify, send_from_directory, \
    flash  # Flask: https://flask.palletsprojects.com/en/2.0.x/quickstart/
from flask_wtf import CSRFProtect
from werkzeug.utils import redirect
import json
import os # OS module in Python: https://www.geeksforgeeks.org/os-module-python-examples/
import Login, Querries, helper

app = Flask(__name__) # Spezialvariable '__name__': https://www.pythontutorial.net/python-basics/python-__name__/#:~:text=The%20__name__%20is,file%20associated%20with%20the%20module.
app.secret_key = os.urandom(24)

#### app.route = We use the route() decorator to tell Flask what URL should trigger our function.


def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'usr' in session:
            return f(*args, **kwargs)
        else:
            return redirect('/')
    return wrap


# Login Page, atm login with db credentials
# redirect user to homepage if he is already logged in
@app.route('/', methods=['GET', 'POST'])
def LoginPage():
    if request.method == 'GET':
        if 'usr' in session:
            return redirect('/homepage/institutes')
        else:
            return render_template('login.html')
    else:
        if Login.LoginDB(request.form['usr'], request.form['pwd']):
            session['admin'] = False
            if request.form['usr'] == 'aaapartnerhs':
                session['admin'] = True
                session['usr'] = 'yes'
            return redirect('/homepage/institutes')
        else:
            return redirect('/')


@app.route('/homepage/<name>', methods=['GET', 'POST'])
@login_required
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
        return render_template('institutes.html')


# return of filter objects
@app.route('/get/<name>', methods=['GET'])
@login_required
def load_filter(name):
    if name == 'institutes':
        return Querries.institutes_ret()
    elif name == 'agreements':
        return Querries.ag_type_ret()
    elif name == 'countries':
        return Querries.all_countries()
    elif name == 'faculties':
        return Querries.faculty()
    else:
        return None


@app.route('/delete/<object_type>', methods=['POST'])
@login_required
def delete_object(object_type):
    return Querries.checkLength(object_type, request.form.to_dict()['id'])


# get data needed for institute modal
# filtered institute id from website
@app.route('/openModal', methods=['POST'])
@login_required
def load_institute_modal_data():
    return Querries.for_institute_modal(request.form['id'])


# get data needed for mentor modal
# filtered institute id from website
@app.route('/openMentorModal', methods=['POST'])
@login_required
def load_mentor_modal_data():
    return Querries.for_mentor_modal(request.form['id'])


@app.route('/add/<name>', methods=['POST', 'GET'])
@login_required
def new_object(name):
    if name == 'Mentor':
        active = 0
        req = request.form.to_dict()
        columns = []
        values = []
        for key in req:
            if key == 'active':
                active = 1
                break
            # key = dict key, req[key] = value
            columns.append(key)
            values.append(req[key])
        columns.append('active')
        values.append(active)
        return Querries.new_object('mentor', columns, values)
    elif name == 'Institute':
        my_var = request.form.to_dict()
        # for insert into tbl_institute
        col_list_institute = []
        val_list_institute = []
        if 'display' not in request.form:
            col_list_institute.append('display')
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
        return Querries.new_object('institute', col_list_institute, val_list_institute, name, val)
    elif name == 'Agreement':
        agreement_obj = request.form.to_dict()
        agreement_obj.pop('ID')  # delete because it's not necessary for further workflow
        print('call', agreement_obj)
        if hasattr(agreement_obj, 'restrictions'):
            new_restrictions = agreement_obj['restrictions']
            agreement_obj.pop('restrictions')
        ps_id = helper.checkValidPartnership(agreement_obj['partnership_type_ID'], agreement_obj['institute_ID'])
        agreement_obj.pop('partnership_type_ID')
        agreement_obj.pop('institute_ID')
        columns = []
        values = []
        columns.append('partnership_ID')
        values.append(ps_id)
        print(agreement_obj)
        for key in agreement_obj:
            if key == 'inactive':
                values.append(int(agreement_obj[key]))
            else:
                values.append(agreement_obj[key])
            columns.append(key)
        if 'inactive' not in agreement_obj:
            columns.append('inactive')
            values.append(0)
        print('agreement: ', columns, values)
        return_val = Querries.new_object('agreement', columns, values)
        if 'new_restrictions' in locals():
            for new_restriction in new_restrictions:
                restriction_columns = []
                restriction_values = []
                for key in new_restriction:
                    if key in ('subnum_mobility', 'subnum_months'):
                        if len(new_restriction[key]) > 0:
                            restriction_columns.append(key)
                            restriction_values.append(new_restriction[key])
                    else:
                        restriction_columns.append(key)
                        restriction_values.append(new_restriction[key])
                    print('new restriction in new Ag: ', restriction_values, restriction_columns)
                Querries.new_object('restriction', restriction_columns, restriction_values)
            return jsonify({'state': 'successful'})
        else:
            #return return_val
            return ""
    elif name == 'Restriction':
        add_restriction = request.form.to_dict()
        print(add_restriction)
        restriction_columns = []
        restriction_values = []
        add_restriction.pop('restriction_ID')
        add_restriction['incoming'] = int(add_restriction['incoming'])
        for key in add_restriction:
            if key in ('subnum_mobility', 'subnum_months'):
                if len(add_restriction[key]) > 0:
                    restriction_columns.append(key)
                    restriction_values.append(add_restriction[key])
            else:
                restriction_columns.append(key)
                restriction_values.append(add_restriction[key])
        print('new restriction: ', restriction_values, restriction_columns)
        return Querries.new_object('restriction', restriction_columns, restriction_values)
    else:
        return jsonify({'status': 'unexpected request'})


@app.route('/filterInstitute', methods=['POST'])
@login_required
def handle_filter():
    if request.method == 'POST':
        my_list = request.form.to_dict()
        # Filter Anzeige auf HTW Seite
        if my_list['filter_shown'] == 'y':
            my_list['filter_shown'] = '1'
        elif my_list['filter_shown'] == 'n':
            my_list['filter_shown'] = '0'
        # Filter Verträge Aktiv
        if my_list['filter_activity'] == 'y':
            my_list['filter_activity'] = '0' #in DB -> 0 = aktiv, 1 = inaktiv
        elif my_list['filter_activity'] == 'n':
            my_list['filter_activity'] = '1'
        var = ['%' if i == 'none' else i for i in my_list.values()]
        return Querries.filter_institutes(var)


@app.route('/changeData/<name>', methods=['POST'])
@login_required
def changes(name):
    x = request.form.to_dict()
    change_id = 0
    change_type = ''
    if name == 'addInstitute':
        pass
    elif name == 'updateInstitute':
        change_id = x['ID']
        x.pop('ID')
        change_type = 'institute'
        if hasattr(x, 'display'):
            x['display'] = int(x['display'])
    elif name == 'updateAgreement':
        change_id = x['ID']
        x.pop('ID')
        change_type = 'agreement'
        if hasattr(x, 'inactive'):
            x['inactive'] = int(x['inactive'])
    elif name == 'updateRestriction':
        change_id = x['ID']
        x.pop('ID')
        change_type = 'restriction'
    elif name == 'mentor':
        change_type = 'mentor'
        change_id = x['id']
        x.pop('id')
        if hasattr(x, 'active'):
            x['active'] = int(x['active'])
    values = []
    for key in x:
        if key in ('active', 'display', 'inactive'):
            values.append(int(x[key]))
        else:
            values.append(x[key])
    print(values)
    Querries.edit(x.keys(), values, change_id, change_type)
    return redirect(url_for('LoginPage'))


@app.route('/loader/<name>', methods=['GET', 'POST']) # <name> : URL-Parameter kann übergeben
@login_required
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
        return Querries.get_ma_and_courses(request.form['id'])
    else:
        return jsonify('answer: Unexpected Request')


@app.route('/logout', methods=['GET'])
def logout():
    resp = make_response(redirect(url_for('LoginPage')))
    session.pop('usr', None)
    session.pop('admin', None)
    return resp


# give browser all files that are needed (js files,...)
@app.route('/<string:filename>', methods=['GET'])
@login_required
def ret_file(filename):
    return send_from_directory('templates', filename)


def return_session():
    return session['admin']


if __name__ == '__main__':
    app.run(debug=True) # bei Fehlern in der VM debug=True durch host='0.0.0.0' ersetzen
