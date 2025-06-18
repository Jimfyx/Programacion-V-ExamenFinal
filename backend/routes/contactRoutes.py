from flask import Blueprint, request, jsonify
from services.contactService import create_contact, get_all_contacts, get_contact_by_id

contact_bp = Blueprint('contact', __name__)

@contact_bp.route('/', methods=['POST', 'OPTIONS'])
def create():
    data = request.get_json()
    contact = create_contact(data)
    return jsonify({"message": "Contacto creado", "id": contact["id"]}), 201

@contact_bp.route('/', methods=['GET'])
def get_all():
    return jsonify(get_all_contacts()), 200

@contact_bp.route('/<int:id>', methods=['GET'])
def get_by_id(id):
    contact = get_contact_by_id(id)
    if contact:
        return jsonify(contact), 200
    return jsonify({"message": "Contacto no encontrado"}), 404