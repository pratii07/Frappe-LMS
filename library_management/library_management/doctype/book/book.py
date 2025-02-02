# Copyright (c) 2025, PAS and contributors
# For license information, please see license.txt

import frappe
from frappe.website.website_generator import WebsiteGenerator
import uuid


class Book(WebsiteGenerator):
	# pass
	
	def before_save(self):
		if not self.route:
			self.route = f"book/{self.name}"
			self.is_published = True
	
	

