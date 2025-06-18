import uuid

contacts_db = {}

def create_contact(data):
    contact_id = str (uuid.uuid4())
    contact = {
        "id": contact_id,
        "first_name": data.get('first_name', ''),
        "last_name": data.get('last_name', ''),
        "email": data.get('email', ''),
        "type": data.get('type', ''),
        "message": data.get('message', ''),
    }
    contacts_db[contact_id] = contact
    print(f"Contacto creado: {contact_id}")
    return contact

def get_all_contacts():
    return list(contacts_db.values())

def get_contact_by_id(contact_id):
    return contacts_db.get(contact_id)