PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE `pro_emails` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`subject` text NOT NULL,
	`content` text NOT NULL,
	`sent_at` integer NOT NULL,
	`sent_by` text NOT NULL
);
INSERT INTO pro_emails VALUES(1,'nahusenaytadesse75@gmail.com','Test','Test',1756800621,'Nahusenay Tadesse');
INSERT INTO pro_emails VALUES(2,'nahusenaytadesse75@gmail.com','Hopefully final test','I may get blocked for this, but gotta try',1756800684,'User');
INSERT INTO pro_emails VALUES(3,'nahusenaytadesse75@gmail.com','Test','Test',1756801077,'Nahusenay Tadesse');
INSERT INTO pro_emails VALUES(4,'israeldereje19@gmail.com','Hi Israel, ',' just testing the email sending capablities of bymeklit',1756808803,'Nahusenay Tadesse');
INSERT INTO pro_emails VALUES(5,'nahusenaytadesse75@gmail.com','Sqlite Fixed, I think','Username should be stable now, please cpanel, don''t reject me now',1756809788,'Nahusenay Tadesse');
INSERT INTO pro_emails VALUES(6,'nahusenaytadesse75@gmail.com','Rich Text editor Test','<p><strong><u>Hello Rich Text, </u></strong></p><ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>First List with no</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>Second List</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>I don''t know this is the numbered list</li></ol>',1756881170,'Nahusenay Tadesse');
INSERT INTO pro_emails VALUES(7,'abel@ethioiq.com','Testing','<p>Testing Email</p>',1756883988,'Nahusenay Tadesse');
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
INSERT INTO session VALUES('68247408e9135c6d26b6e657d5c876c166f7d4db61a7585d8bfee9547b1f2167','5rwdrmb7amwaqrb3546z7spy',1759374085);
INSERT INTO session VALUES('209ca4d1ab4b32ef4ababdf5acfebd326869380b575839383897a9b4804e95fc','5rwdrmb7amwaqrb3546z7spy',1759374107);
INSERT INTO session VALUES('519879a3b2b770f7eb930263587c72895e7508000609cb0e3a3b9004bffb743e','5rwdrmb7amwaqrb3546z7spy',1759487932);
INSERT INTO session VALUES('5fb7d9923afc67d1b611a020301222aa9d994bf9142af8e11b42a66fed18b7c6','75y22gwvwqxzg2wv33mjtyoo',1759488826);
INSERT INTO session VALUES('0c1585fe3f2f882b28a4a3fd6b315fb68edcc404f30da1a78fd702159ff2ed9e','5rwdrmb7amwaqrb3546z7spy',1759497632);
INSERT INTO session VALUES('22005bfb7c49f5ed2c2ad3fba547358ca1b934771e69900d42847e88f0d1e9f6','5rwdrmb7amwaqrb3546z7spy',1759497633);
INSERT INTO session VALUES('1508e4ff92c77d0a17cb3bda2512fe9c18c44342306f2cb14d94a430f342f50c','5rwdrmb7amwaqrb3546z7spy',1759497641);
INSERT INTO session VALUES('59ca14ed35599cb11c38dc8d50a1fd9b7b6b59c36089bba0105a7a332d426d8e','5rwdrmb7amwaqrb3546z7spy',1759497762);
INSERT INTO session VALUES('d4ecca8b584ab80ba87b3bfd351306413999cd97267e21096dbaec88c3cc980d','5rwdrmb7amwaqrb3546z7spy',1759509306);
INSERT INTO session VALUES('1562698bf970f352010ea414ac126e4f284a7ff9dc91e7fd77bbd41b95f60841','5rwdrmb7amwaqrb3546z7spy',1759521457);
INSERT INTO session VALUES('2f50f8030a70844dffd4b72031770bd1989f1c373b1f112879723fd5c9780051','5rwdrmb7amwaqrb3546z7spy',1759569133);
INSERT INTO session VALUES('9bb6e9ade2540d7787db8bd796e35ca44f4d3fa2dd991ca0542634f017377622','5rwdrmb7amwaqrb3546z7spy',1759605759);
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`username` text NOT NULL,
	`password_hash` text NOT NULL
);
INSERT INTO user VALUES('5rwdrmb7amwaqrb3546z7spy','nahusenaytadesse75@gmail.com','Nahusenay Tadesse','nahu','$argon2id$v=19$m=19456,t=2,p=1$XyMV1I0zPs2k0Es6X0RtvA$7XDGtQEzNo5ZMovd0PvDTWn854hF/CzvoGpoyPicboM');
INSERT INTO user VALUES('75y22gwvwqxzg2wv33mjtyoo','nahusenaytadesse12@gmail.com','Nahusenay Tadesse','nahusenaytadesse12','$argon2id$v=19$m=19456,t=2,p=1$MdTIU25ILRkadfkzGbHUcQ$jzn7RS3HxAfBR55CraVY0iB0ZdDp4dXn5dSKyKu0DP8');
INSERT INTO user VALUES('tz6n3zvqfiq6gx5kjixpmfr3','test@bymeklit.shop','Admin','test','$argon2id$v=19$m=19456,t=2,p=1$rlLl8Htp0zOJvX9sZgoi4Q$ttIZ6GWz5EY1T2BJET/EZ1c+0A70pHtnk6dWXpZdtKQ');
CREATE TABLE IF NOT EXISTS "help" (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`image` text,
	`video` text
);
INSERT INTO help VALUES(1,'What does “Cash on Delivery” mean?','<p>It means you pay for your order when it arrives at your doorstep, instead of paying online. </p>',NULL,'');
INSERT INTO help VALUES(2,'Is there an extra cost for Cash on Delivery?','Sometimes a small fee may apply, depending on your order and location. If there is one, you’ll see it clearly before confirming checkout.',NULL,NULL);
INSERT INTO help VALUES(3,'Can I use Cash on Delivery everywhere?','<p>Cash on Delivery(COD) is available in most areas, but in some regions it may not be supported. If it’s not available in your area, you’ll see other payment options instead.</p>',NULL,'');
INSERT INTO help VALUES(4,'How does “Bank Transfer” work?','You place your order, then send the payment directly from your bank to ours using the account details shown during checkout.',NULL,NULL);
INSERT INTO help VALUES(5,'When will my order be processed?','Your order will stay on hold until we confirm that the payment has reached our bank. Once confirmed, we’ll prepare your order for delivery.',NULL,NULL);
INSERT INTO help VALUES(6,'What if I forget to send the transfer?','If we don’t receive payment, your order may be delayed or canceled. Please complete the transfer as soon as possible after placing your order.',NULL,NULL);
INSERT INTO help VALUES(7,'What is Chapa?','Chapa is a secure payment service in Ethiopia that lets you pay with Telebirr, CBE Birr, Amole, HelloCash, E-Birr, or with cards like Visa, Mastercard, Amex, and even PayPal.',NULL,NULL);
INSERT INTO help VALUES(8,'How do I pay with Chapa?','At checkout, select Chapa and choose your preferred method (mobile money, card, or PayPal). You’ll be guided step by step until your payment is complete.',NULL,NULL);
INSERT INTO help VALUES(9,'Is it safe to use Chapa?','Yes. Chapa uses secure technology to protect your information. Payments are processed instantly, and we’re notified right away.',NULL,NULL);
INSERT INTO help VALUES(10,'Can I pay in Ethiopian Birr?','Yes, you can pay in Birr for local purchases. If you’re outside Ethiopia, you can also pay using cards or PayPal.',NULL,NULL);
INSERT INTO help VALUES(11,'What payment options do I have?','You can choose between: Cash on Delivery – pay when the order arrives; Bank Transfer – send money from your bank; Chapa – pay with mobile money, cards, or PayPal.',NULL,NULL);
INSERT INTO help VALUES(12,'How do I know if my payment was successful?','For Cash on Delivery, you’ll pay when the package is delivered. For Bank Transfer, you’ll get updates after we confirm the payment. For Chapa, you’ll see an instant confirmation once the payment goes through.',NULL,NULL);
INSERT INTO help VALUES(13,'Can I get a receipt?','<p>Yes. After checkout, you’ll receive an order confirmation by email. For Chapa and Bank Transfer, you may also receive a payment receipt from your bank or Chapa.</p>',NULL,'');
INSERT INTO help VALUES(14,'What if I face a problem while paying?','Don’t worry. Just contact our support team, share your order number, and we’ll help you complete the payment or provide another option.',NULL,NULL);
INSERT INTO help VALUES(20,'Test','<p>Test</p>',NULL,'');
CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric
			);
CREATE TABLE IF NOT EXISTS "admin_help" (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`image` text,
	`video` text
);
INSERT INTO admin_help VALUES(1,'Adding Products in ByMeklit Ecommerce',replace('To add a new product in ByMeklit:\n1. Go to the WordPress Dashboard → Ecommerce → Products → Add New.\n2. Enter the product name, description, price, and stock.\n3. Under Product Data, choose Simple or Variable product.\n4. Publish the product to make it live on your site.','\n',char(10)),NULL,NULL);
INSERT INTO admin_help VALUES(2,'Adding Images and Gallery for Products',replace('To add product images:\n1. In the Product editor, find the "Product Image" panel on the right and upload the main product image.\n2. Use the "Product Gallery" panel to upload multiple images.\n3. For variable products, you can assign different images to each variation inside the Variations tab.','\n',char(10)),NULL,NULL);
INSERT INTO admin_help VALUES(3,'Viewing and Managing Orders',replace('To see customer orders:\n1. Go to WordPress Dashboard → Ecommerce → Orders.\n2. Each order shows customer details, products ordered, payment status, and shipping info.\n3. You can update the order status (Processing, Completed, Refunded) directly from this screen.\n4. You can also manage orders on the WooCommerce mobile app for iOS and Android.','\n',char(10)),NULL,NULL);
INSERT INTO admin_help VALUES(4,'Using Categories, Tags, and Attributes',replace('Categories group products into broad sections (e.g., Clothing, Accessories).\nTags help with search and SEO (e.g., Handmade, Cotton).\nAttributes are product details like size, color, or material, and are required for variable products.\nTo add them: Dashboard → Ecommerce → Products → Categories/Tags/Attributes.','\n',char(10)),NULL,NULL);
INSERT INTO admin_help VALUES(5,'Creating Variable Products with Attributes',replace('To create a variable product:\n1. Add global attributes (size, color, etc.) under Products → Attributes.\n2. In the product editor, switch Product Data type to "Variable product".\n3. Under the Variations tab, create variations based on the attributes.\n4. Assign price, stock, and specific images to each variation.','\n',char(10)),NULL,NULL);
INSERT INTO admin_help VALUES(6,'Using the WooCommerce App with ByMeklit',replace('Download the WooCommerce app from the App Store or Google Play.\nLog in with your WordPress credentials.\nYou can view orders, manage inventory, receive notifications, and track sales in real time directly from your phone.','\n',char(10)),NULL,NULL);
INSERT INTO admin_help VALUES(7,'Extra Ecommerce Tips for Shop Managers',replace('• Use the "Quick Edit" option in the Products list to make fast changes.\n• Always assign categories and tags to improve product discovery.\n• Use attributes consistently so that filtering works correctly in the store.\n• Regularly check "Ecommerce → Reports" or "Analytics" for sales insights.','\n',char(10)),NULL,NULL);
CREATE TABLE `vendor_help` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`image` text,
	`video` text
);
INSERT INTO vendor_help VALUES(1,'How do I become a vendor on ByMeklt?','To become a vendor, simply submit a request through the vendor application form. Once approved, you will be able to list and manage your clothing products on the ByMeklt platform.',NULL,NULL);
INSERT INTO vendor_help VALUES(2,'What types of products can I sell?','ByMeklt focuses on clothing and fashion-related items. Vendors may list apparel, accessories, and related products that meet our quality standards.',NULL,NULL);
INSERT INTO vendor_help VALUES(3,'Is there a cost to join as a vendor?','Joining ByMeklt as a vendor is free. Fees may apply when sales are made, and details are shared with each vendor during onboarding.',NULL,NULL);
INSERT INTO vendor_help VALUES(4,'How do I add new products?','Once approved as a vendor, you can log in to your account and use the product submission form to add titles, descriptions, sizes, and pricing for your clothing items.',NULL,NULL);
INSERT INTO vendor_help VALUES(5,'When do I receive payments for my sales?','Payments are processed on a regular schedule. After each successful order, funds will be transferred to the vendor’s registered account according to our payout timeline.',NULL,NULL);
INSERT INTO vendor_help VALUES(8,'Who sets the prices of the products?','Vendors set their own prices for products. We recommend competitive pricing while keeping in mind product quality and market trends.',NULL,NULL);
INSERT INTO vendor_help VALUES(9,'Can I upload product images?','Yes, vendors should upload high-quality images of their clothing products. Clear and accurate photos help increase sales.',NULL,NULL);
INSERT INTO vendor_help VALUES(10,'How do I contact ByMeklt for support?','<p>Vendors can reach our support team through the help center or by submitting a support request from through filling the form there.</p>',NULL,'');
INSERT INTO sqlite_sequence VALUES('help',20);
INSERT INTO sqlite_sequence VALUES('admin_help',8);
INSERT INTO sqlite_sequence VALUES('vendor_help',14);
INSERT INTO sqlite_sequence VALUES('pro_emails',7);
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);
CREATE UNIQUE INDEX `help_title_unique` ON `help` (`title`);
CREATE UNIQUE INDEX `admin_help_title_unique` ON `admin_help` (`title`);
CREATE UNIQUE INDEX `vendor_help_title_unique` ON `vendor_help` (`title`);
COMMIT;
