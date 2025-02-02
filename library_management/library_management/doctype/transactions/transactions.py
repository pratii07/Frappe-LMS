# Copyright (c) 2025, PAS and contributors
# For license information, please see license.txt

import frappe
from frappe.website.website_generator import WebsiteGenerator
from datetime import datetime

class Transactions(WebsiteGenerator):
# 	# pass

    def before_save(self):
        if not self.route:
            self.route = f"transaction/{self.name}"
            self.is_published = True
        
        if not self.book:
            frappe.throw("Please, Select a book for the transaction.")

        book = frappe.get_doc("Book", self.book)

        if self.transaction_type == "Issue":
            if book.stock > 0:
                book.stock -= 1
                book.save()
            self.overdue = 0  

        if self.transaction_type == "Return":
            book.stock += 1
            book.save()
        
        member_debt = frappe.db.get_value("Member", {"name": self.member}, "outstanding_debt")

        if member_debt and member_debt > 500:  
            frappe.throw("Your outstanding debt is greater than 500. Please Pay It !!")

    
        if isinstance(self.return_date, str):

                self.due_date = datetime.today().strftime("%Y-%m-%d")
                return_date_obj = datetime.strptime(self.return_date, "%Y-%m-%d").date()
                due_date_obj = datetime.strptime(self.due_date, "%Y-%m-%d").date()

                overdue_days = (due_date_obj - return_date_obj).days
                self.overdue = max(0, overdue_days)

                self.fine = 10 * self.overdue if self.overdue > 0 else 0
                
                