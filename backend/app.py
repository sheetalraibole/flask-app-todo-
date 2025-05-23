from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# MySQL Config
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'todo_db'

mysql = MySQL(app)

@app.route('/tasks', methods=['GET'])
def get_tasks():
    cur = mysql.connection.cursor()
    cur.execute("SELECT id, task FROM tasks")
    tasks = cur.fetchall()
    cur.close()
    return jsonify([{ "id": task[0], "task": task[1] } for task in tasks])

@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.json
    task = data.get('task')
    if not task:
        return jsonify({"error": "Task cannot be empty"}), 400
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO tasks (task) VALUES (%s)", (task,))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "Task added successfully"}), 201

@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM tasks WHERE id = %s", (id,))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "Task deleted successfully"})

if __name__ == '__main__':
    app.run(debug=True)
