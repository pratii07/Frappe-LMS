# Copyright (c) 2025, PAS and contributors
# For license information, please see license.txt

import frappe
from frappe.website.website_generator import WebsiteGenerator


class Member(WebsiteGenerator):
	# pass
	def before_save(self):
	    if not self.route:
	        self.route = f"member/{self.name}"
	        self.is_published = True
