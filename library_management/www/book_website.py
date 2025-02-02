import requests
import frappe
# @frappe.whitelist(allow_guest=True)

def get_context(context):
    context.member_records = frappe.get_all(
        'Member', 
        fields=['member_id','name1', 'email','phone_no','route']
    )

    context.book_records = frappe.get_all(
         'Book', 
         fields=['title','book_id', 'author', 'publisher','route']
     )
    context.overdue_books = frappe.get_all(
         'Transactions', 
         filters={"transaction_type":"Return"},
         fields=['member_id','member','book_id','book','author','overdue', 'transaction_type','return_date','fine','route']
     )
    context.Issued_Books = frappe.get_all(
         'Transactions', 
         filters={"transaction_type":"Issue"},
         fields=['member_id','member','book','issue_date','return_date','route','name']
      )
