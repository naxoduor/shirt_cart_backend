-- Create tshirtshop tables

-- Create department table
CREATE TABLE `department` (
  `department_id` INT            NOT NULL  AUTO_INCREMENT,
  `name`          VARCHAR(100)   NOT NULL,
  `description`   VARCHAR(1000),
  PRIMARY KEY  (`department_id`)
) ENGINE=MyISAM;

-- Create category table
CREATE TABLE `category` (
  `category_id`   INT            NOT NULL  AUTO_INCREMENT,
  `department_id` INT            NOT NULL,
  `name`          VARCHAR(100)   NOT NULL,
  `description`   VARCHAR(1000),
  PRIMARY KEY (`category_id`),
  KEY `idx_category_department_id` (`department_id`)
) ENGINE=MyISAM;

-- Create product table
CREATE TABLE `product` (
  `product_id`       INT           NOT NULL  AUTO_INCREMENT,
  `name`             VARCHAR(100)  NOT NULL,
  `description`      VARCHAR(5000) NOT NULL,
  `specification`    VARCHAR(1000) NOT NULL,
  `price`            DECIMAL(10,2) NOT NULL,
  `discounted_price` DECIMAL(10,2) NOT NULL  DEFAULT '0.00',
  `image`            VARCHAR(150) NOT NULL DEFAULT 'image',
  `image_2`          VARCHAR(150),
  `thumbnail`        VARCHAR(150),
  `display`          SMALLINT(6)   NOT NULL  DEFAULT '0',
  PRIMARY KEY  (`product_id`),
  FULLTEXT KEY `idx_ft_product_name_description` (`name`, `description`)
) ENGINE=MyISAM;

-- Create product_category table
CREATE TABLE `product_category` (
  `product_id`  INT NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`product_id`, `category_id`)
) ENGINE=MyISAM;

-- Create attribute table (stores attributes such as Size and Color)
CREATE TABLE `attribute` (
  `attribute_id` INT          NOT NULL  AUTO_INCREMENT,
  `name`         VARCHAR(100) NOT NULL, -- E.g. Color, Size
  PRIMARY KEY (`attribute_id`)
) ENGINE=MyISAM;


-- Create attribute_value table (stores values such as Yellow or XXL)
CREATE TABLE `attribute_value` (
  `attribute_value_id` INT          NOT NULL  AUTO_INCREMENT,
  `attribute_id`       INT          NOT NULL, -- The ID of the attribute
  `value`              VARCHAR(100) NOT NULL, -- E.g. Yellow
  PRIMARY KEY (`attribute_value_id`),
  KEY `idx_attribute_value_attribute_id` (`attribute_id`)
) ENGINE=MyISAM;

-- Create product_attribute table (associates attribute values to products)
CREATE TABLE `product_attribute` (
  `product_id`         INT NOT NULL,
  `attribute_value_id` INT NOT NULL,
  PRIMARY KEY (`product_id`, `attribute_value_id`)
) ENGINE=MyISAM;


-- Create shopping_cart table
CREATE TABLE `shopping_cart` (
  `item_id`     INT  NOT NULL,
  `cart_id`     CHAR(32)      NOT NULL,
  `product_id`  INT           NOT NULL,
  `attributes`  VARCHAR(1000) NOT NULL,
  `quantity`    INT           NOT NULL,
  `buy_now`     BOOL          NOT NULL  DEFAULT true,
  `added_on`    DATETIME      NOT NULL,
  PRIMARY KEY (`item_id`),
  KEY `idx_shopping_cart_cart_id` (`cart_id`)
) ENGINE=MyISAM;

-- Create orders table
CREATE TABLE `orders` (
  `order_id`     INT           NOT NULL  AUTO_INCREMENT,
  `total_amount` DECIMAL(10,2) NOT NULL  DEFAULT '0.00',
  `created_on`   DATETIME      NOT NULL,
  `shipped_on`   DATETIME,
  `status`       INT           NOT NULL  DEFAULT '0',
  `comments`     VARCHAR(255),
  `customer_id`  INT,
  `auth_code`    VARCHAR(50),
  `reference`    VARCHAR(50),
  `shipping_id`  INT,
  `tax_id`       INT,
  PRIMARY KEY  (`order_id`),
  KEY `idx_orders_customer_id` (`customer_id`),
  KEY `idx_orders_shipping_id` (`shipping_id`),
  KEY `idx_orders_tax_id` (`tax_id`)
) ENGINE=MyISAM;

-- Create order_details table
CREATE TABLE `order_detail` (
  `item_id`      INT           NOT NULL  AUTO_INCREMENT,
  `order_id`     INT           NOT NULL,
  `product_id`   INT           NOT NULL,
  `attributes`   VARCHAR(1000) NOT NULL,
  `product_name` VARCHAR(100)  NOT NULL,
  `quantity`     INT           NOT NULL,
  `unit_cost`    DECIMAL(10,2) NOT NULL,
  PRIMARY KEY  (`item_id`),
  KEY `idx_order_detail_order_id` (`order_id`)
) ENGINE=MyISAM;

-- Create shipping_region table
CREATE TABLE `shipping_region` (
  `shipping_region_id` INT          NOT NULL  AUTO_INCREMENT,
  `shipping_region`    VARCHAR(100) NOT NULL,
  PRIMARY KEY  (`shipping_region_id`)
) ENGINE=MyISAM;

-- Create customer table
CREATE TABLE `customer` (
  `customer_id`        INT           NOT NULL AUTO_INCREMENT,
  `name`               VARCHAR(50)   NOT NULL,
  `email`              VARCHAR(100)  NOT NULL,
  `password`           VARCHAR(200)   NOT NULL,
  `credit_card`        TEXT,
  `address_1`          VARCHAR(100),
  `address_2`          VARCHAR(100),
  `city`               VARCHAR(100),
  `region`             VARCHAR(100),
  `postal_code`        VARCHAR(100),
  `country`            VARCHAR(100),
  `shipping_region_id` INT           NOT NULL default '1',
  `day_phone`          varchar(100),
  `eve_phone`          varchar(100),
  `mob_phone`          varchar(100),
  PRIMARY KEY  (`customer_id`),
  UNIQUE KEY `idx_customer_email` (`email`),
  KEY `idx_customer_shipping_region_id` (`shipping_region_id`)
) ENGINE=MyISAM;

-- Create shipping table
CREATE TABLE `shipping` (
  `shipping_id`        INT            NOT NULL AUTO_INCREMENT,
  `shipping_type`      VARCHAR(100)   NOT NULL,
  `shipping_cost`      NUMERIC(10, 2) NOT NULL,
  `shipping_region_id` INT            NOT NULL,
  PRIMARY KEY (`shipping_id`),
  KEY `idx_shipping_shipping_region_id` (`shipping_region_id`)
) ENGINE=MyISAM;

-- Create tax table
CREATE TABLE `tax` (
  `tax_id`         INT            NOT NULL  AUTO_INCREMENT,
  `tax_type`       VARCHAR(100)   NOT NULL,
  `tax_percentage` NUMERIC(10, 2) NOT NULL,
  PRIMARY KEY (`tax_id`)
) ENGINE=MyISAM;

-- Create audit table
CREATE TABLE `audit` (
  `audit_id`       INT      NOT NULL AUTO_INCREMENT,
  `order_id`       INT      NOT NULL,
  `created_on`     DATETIME NOT NULL,
  `message`        TEXT     NOT NULL,
  `code`           INT      NOT NULL,
  PRIMARY KEY (`audit_id`),
  KEY `idx_audit_order_id` (`order_id`)
) ENGINE=MyISAM;

-- Create review table
CREATE TABLE `review` (
  `review_id`   INT      NOT NULL  AUTO_INCREMENT,
  `customer_id` INT      NOT NULL,
  `product_id`  INT      NOT NULL,
  `review`      TEXT     NOT NULL,


  `rating`      SMALLINT NOT NULL,
  `created_on`  DATETIME NOT NULL,
  PRIMARY KEY (`review_id`),
  KEY `idx_review_customer_id` (`customer_id`),
  KEY `idx_review_product_id` (`product_id`)
) ENGINE=MyISAM;

-- Populate department table
INSERT INTO `department` (`department_id`, `name`, `description`) VALUES
       (1, 'Solar', 'Solar Panels');

-- Populate category table
INSERT INTO `category` (`category_id`, `department_id`, `name`, `description`) VALUES
       (1, 1, 'Solar', 'SolarMax Solar Panels');

-- Populate product table
INSERT INTO `product` (`product_id`, `name`,`description`,`specification`,`price`, `discounted_price`, `image`, `image_2`, `thumbnail`, `display`) VALUES
(1, 
'solarmax  Solar Africa SolarMax 150W 12V Mono crystalline solar panel',
'High efficiency cells, roduct detailsType: mono crystalineUse: Inverter ChargingDurability: HighCell Efficiency: HighInstallation: Use Expert like usSolar
 panels trap the free energy of the sun for your use. It can be 
integrated into your existing installation of Inverter and Batteries.SpecificationsSpecificationsSKU: SO830HL001D8ANAFAMZWattage: 12V, 160WMain Material: GlassWeight (kg): 7Customers who viewed this also viewed20A LCD Solar Charger Controller Dual USBKSh 3,299-50%200W Mono Crystalline Solar Panel,High Efficiency CellsKSh 20,999-19%100 Watt 12 Volt Solar PanelKSh 7,000-36%Top quality 80W polycrystalline solar panelKSh 8,999-55%200 Watt Complete Solar Charging Kit with SolarMax 600 Watt Power InverterKSh 25,999-16%100W SOLARMAX MONOCRYSTALLINE SOLAR PANEL 12 VOLTS MULTICOLORED.KSh 6,499-24%Solar Panel 200W With Charge ControllerKSh 25,999-24%High Quality Maintenance Free Solar 80Ah BatteryKSh 19,999-33%Solar panel 80 watt 12 -18v,charger controller, 300watt inverter,3LED bulbsKSh 8,900-36%80 Watts 12 Volts  Mono Crystalline Solar PanelKSh 6,300-10%SolarMax 200W 12V  Mono crystalline solar panel,High efficiency cellsKSh 18,000-40%Chloride exide Solar Panel - 80Watts - 12volts - BlackKSh 7,899-21%Solar Max 150W 18VKSh 9,500-2%100 Watt Monocrystalline 100W 12V Solar Panel High Efficiency Mono ModuleKSh 9,500-24%Customer FeedbackThis product has no ratings yet.Product detailsSpecificationsCustomer Feedbacksolarmax Solar Africa SolarMax 150W 12V Mono crystalline solar panel,High efficiency cellsKSh 8,600-Add to cart',
'SpecificationsSKU: SO830HL001D8ANAFAMZWattage: 12V, 160WMain Material: GlassWeight (kg): 7
found row when checking',
  8600.00,
  0.00,
  'solarmax1.jpg',
  'solarmax1.jpg',
  'solarmax1.jpg',
  0),
(2,
 'solarmax  Poly 100 Watt Solar Panel',
 'High --  module conversion efficiency. Ideal output for single panel: 100Wh per day     (depending on the availability of sunlight).    Bypass     diode minimizes power drop caused by shade and ensures excellent     performance in low-light environmentswork with     all weather even when there is mist and rainlyEL tested     solar modules; no hot-spot heating guaranteed.Advanced     encapsulation material with multilayered sheet laminations to enhance cell     performance and provide a long service life. Corrosion-resistant     aluminum frame for extended outdoor use, allowing the panels to last for     decades as well as withstand high winds (2400Pa.  Anti-reflective,     high transparency, low iron-tempered glass with enhanced stiffness and     impact resistance..TPT back     sheet ensures smooth performance over a long period of time',
 'specificationsKey Features·Open Circuit Voltage: 15.5V ·Short Circuit Current: 6.37A  ·Max Power Voltage: 17.5V ·Max Power Current: 5.71A ·Max System Voltage: 700VDC·25 year life expectancyWhat’s in the box1*Panel',
 6960.00, 
 8700.00,
 'solarmax2.jpg',
 'solarmax2.jpg',
 'solarmax2.jpg',
 0),
 (3, 
 'solarmax  Solar 120 Watt Solar Panel ( All Weather) Poly', 
 'Product detailssolarmax solar panel have  high efficiency solar modules are constructed from 36 
polycrystalline, (12V modules) or 72 cells (24V modules) cells. The 
cells are individually tested and matched for optimum performance before
 being built into the protective module structure. A Tedlar® base is 
used and ethylene vinyl acetate encapsulant.High transmission tempered 
glass protects the cells from the front and a high strength polymer 
sheet at the rear.
A reinforced aluminium frame completes the laminate 
structure which is fully sealed against moisture and protected from 
environmental and mechanical damage.Most common mistake people is mixing of batterys. car batterys are not good in solar storage and have internal resistancefor more information, contact the seller  for guideline SpecificationsKey FeaturesType: poly- crystalineUse: Inverter ChargingDurability: HighCell Efficiency: HighInstallation: Use Expert like reowatt electrica enterprisesSolar panels trap the free energy of the sun for your use. It can be integrated into your existing installation of Inverter and Batteries.What’s in the boxSolar PanelSpecificationsSKU: SO830HL10LP32NAFAMZWattage: 120wCare Label: INSTALLED BY QUALIFIED ELECTRICAL TECHNICIAN ( reowatt electrical s)<br />Main Material: Silicon,glassSize (L x W x H cm): 1120 x80 x 8Weight (kg):',
'Key FeaturesType: poly- crystalineUse: Inverter ChargingDurability: HighCell Efficiency: HighInstallation: Use Expert like reowatt electrica enterprisesSolar panels trap the free energy of the sun for your use. It can be integrated into your existing installation of Inverter and Batteries.What’s in the boxSolar PanelSpecificationsSKU: SO830HL10LP32NAFAMZWattage: 120wCare Label: INSTALLED BY QUALIFIED ELECTRICAL TECHNICIAN ( reowatt electrical s)<br />Main Material: Silicon,glassSize (L x W x H cm): 1120 x80 x 8Weight (kg): 7
',
 10999.00,
 20999.00,
 'solarmax3.jpg',
 'solarmax3.jpg',
 'solarmax3.jpg',
 0),
 (4,
 'solarmax Solar Panel 150Watts, Charger Controller, 600Watts Inverter,3 LED Bulbs
',
 'Product detailssolarmax solar panel have  high efficiency solar modules are constructed from 36 polycrystalline, (12V modules) or 72 cells (24V modules) cells. The cells are individually tested and matched for optimum performance before being built into the protective module structure. A Tedlar ® base is used and ethylene vinyl acetate encapsulate. High transmission tempered glass protects the cells from the front and a high strength polymer sheet at the rear. A reinforced aluminium frame completes the laminate structure which is fully sealed against moisture and protected from environmental and mechanical damage.Most common mistake people is mixing of battery. car battery are not good in solar storage and have internal resistance for more information, contact the seller  for guidelineA basic charge controller simply performs the necessary function of ensuring that your batteries cannot be damaged by over-charging, effectively cutting off the current from the PV panels (or reducing it to a pulse) when the battery voltage reaches a certain level.SpecificationsWhat’s in the box150watt Solar Panel. 600 watt inverter, charger controller, bulbsSpecificationsSKU: SO830IP12BNSMNAFAMZMain Material: Silicon,glassSize (L x W x H cm): 1150 x 80 x 8Weight (kg): 9Customer FeedbackThis product has no ratings yet',
 'Product detailsSpecificationsCustomer Feedbacksolarmax Solar Panel 150Watts, Charger Controller, 600Watts Inverter,3 LED BulbsKSh 15,800KSh 20,800-24%Add to cart
found row when checking
What’s in the box150watt Solar Panel. 600 watt inverter, charger controller, bulbsSpecificationsSKU: SO830IP12BNSMNAFAMZMain Material: Silicon,glassSize (L x W x H cm): 1150 x 80 x 8Weight (kg): 9
',
15800.00,
20800.00, 
'solarmax4.jpg', 
'solarmax4.jpg', 
'solarmax4.jpg', 
0),
(5,
'solarmax 100 watt Solar Panel,charger controller, 300watt inverter, 3 bulbs', 
'Product detailssolarmax solar panel have  high efficiency solar modules are constructed from 36 
polycrystalline, (12V modules) or 72 cells (24V modules) cells. The 
cells are individually tested and matched for optimum performance before
 being built into the protective module structure. A Tedlar® base is 
used and ethylene vinyl acetate encapsulant. High transmission tempered 
glass protects the cells from the front and a high strength polymer 
sheet at the rear. A reinforced aluminium frame completes the laminate 
structure which is fully sealed against moisture and protected from 
environmental and mechanical damage.Most common mistake people is mixing of batterys. car batterys are not good in solar storage and have internal resistancefor more information, contact the seller  for guideline A basic charge controller simply performs the necessary function of ensuring that your batteries cannot be damaged by over-charging, effectively cutting off the current from the PV panels (or reducing it to a pulse) when the battery voltage reaches a certain level.SpecificationsKey FeaturesType: poly- crystalineUse: Inverter ChargingDurability: HighCell Efficiency: HighInstallation: Use Expert like reowatt electrica enterprisesSolar panels trap the free energy of the sun for your use. It can be integrated into your existing installation of Inverter and Batteries. charger controllerBuilt-in micro controller.Large screen LCD display.Charge and discharge parameters can be adjusted.With power off memory function.Dual USB output. Support for iPhone charging.Fully 4-stage PWN charge inverterWide input mains voltage: 160 - 260v.High efficiency, low loss design.Friendly operation interface and clear information display.Pure sine wave output suitable for all appliances.Intelligent cooling fan for quieter working.Robust design for long trouble free service. What’s in the boxSolar Panel. 300watt inverter, charger controller, bulbsSpecificationsSKU: SO830HL12VBUMNAFAMZCapacity (L): 100Wattage: 100w 12v - 18vCare Label: INSTALLED BY QUALIFIED ELECTRICAL TECHNICIAN ( reowatt electricals)<br />Main Material: Silicon,glassSize (L x W x H cm): 1120 x80 x 8Weight (kg): 7Customer FeedbackSee AllProduct Ratings (3)4.3/54.3 out of 53 ratings5(2)4(0)3(1)2(0)1(0)Product Reviews (1)5 out of 5100 Watt Solar PanelVery Nice Item, it can take up to 20 bulbs of 7 - 9 watts not bad09-12-2019 by JANAKVerified PurchaseProduct detailsSpecificationsCustomer Feedbacksolarmax 100 watt Solar Panel,charger controller, 300watt inverter, 3 bulbsKSh 10,500KSh 15,000', 
'FeaturesType: poly- crystalineUse: Inverter ChargingDurability: HighCell Efficiency: HighInstallation: Use Expert like reowatt electrica enterprisesSolar panels trap the free energy of the sun for your use. It can be integrated into your existing installation of Inverter and Batteries. charger controllerBuilt-in micro controller.Large screen LCD display.Charge and discharge parameters can be adjusted.With power off memory function.Dual USB output. Support for iPhone charging.Fully 4-stage PWN charge inverterWide input mains voltage: 160 - 260v.High efficiency, low loss design.Friendly operation interface and clear information display.Pure sine wave output suitable for all appliances.Intelligent cooling fan for quieter working.Robust design for long trouble free service. What’s in the boxSolar Panel. 300watt inverter, charger controller, bulbsSpecificationsSKU: SO830HL12VBUMNAFAMZCapacity (L): 100Wattage: 100w 12v - 18vCare Label: INSTALLED BY QUALIFIED ELECTRICAL TECHNICIAN ( reowatt electricals)<br />Main Material: Silicon,glassSize (L x W x H cm): 1120 x80 x 8Weight (kg): 7
', 
10500.00, 
15000.00, 
'solarmax5.jpg', 
'solarmax5.jpg', 
'solarmax5.jpg', 
0),
(6, 
'solarmax 200Watts Solar Panel with 300Watt Inverter and 20A charge controller', 
'Product details200Watts Solar Panel with 300Watt Inverter and 20A charge controllerHigh module conversion efficiency. Ideal output for single panel: 200Wh per day (depending on the availability of sunlight).Bypass diode minimizes power drop caused by shade and ensures excellent performance in low-light environmentswork with all weather even when there is mist and rainlyEL tested solar modules; no hot-spot heating guaranteed.Advanced encapsulation material with multilayered sheet laminations to enhance cell performance and provide a long service life.Corrosion-resistant aluminum frame for extended outdoor use, allowing the panels to last for decades as well as withstand high winds (2400Pa.Anti-reflective, high transparency, low iron-tempered glass with enhanced stiffness and impact resistance..TPT back sheet ensures smooth performance over a long period of timeHigh module conversion efficiency. Ideal output for single panel: 200Wh per day (depending on the availability of sunlight).Bypass diode minimizes power drop caused by shade and ensures excellent performance in low-light environmentswork with all weather even when there is mist and rainlyEL tested solar modules; no hot-spot heating guaranteed.Advanced encapsulation material with multilayered sheet laminations to enhance cell performance and provide a long service life.Corrosion-resistant aluminum frame for extended outdoor use, allowing the panels to last for decades as well as withstand high winds (2400Pa.Anti-reflective, high transparency, low iron-tempered glass with enhanced stiffness and impact resistance..TPT back sheet ensures smooth performance over a long period of timeHigh module conversion efficiency. Ideal output for single panel: 200Wh per day (depending on the availability of sunlight).Bypass diode minimizes power drop caused by shade and ensures excellent performance in low-light environmentswork with all weather even when there is mist and rainlyEL tested solar modules; no hot-spot heating guaranteed.Advanced encapsulation material with multilayered sheet laminations to enhance cell performance and provide a long service life.Corrosion-resistant aluminum frame for extended outdoor use, allowing the panels to last for decades as well as withstand high winds (2400Pa.Anti-reflective, high transparency, low iron-tempered glass with enhanced stiffness and impact resistance..TPT back sheet ensures smooth performance over a long period of timeHigh module conversion efficiency. Ideal output for single panel: 200Wh per day (depending on the availability of sunlight).Bypass diode minimizes power drop caused by shade and ensures excellent performance in low-light environmentswork with all weather even when there is mist and rainlyEL tested solar modules; no hot-spot heating guaranteed.Advanced encapsulation material with multilayered sheet laminations to enhance cell performance and provide a long service life.Corrosion-resistant aluminum frame for extended outdoor use, allowing the panels to last for decades as well as withstand high winds (2400Pa.Anti-reflective, high transparency, low iron-tempered glass with enhanced stiffness and impact resistance..TPT back sheet ensures smooth performance over a long period of timeHigh module conversion efficiency. Ideal output for single panel: 200Wh per day (depending on the availability of sunlight).Bypass diode minimizes power drop caused by shade and ensures excellent performance in low-light environmentswork with all weather even when there is mist and rainlyEL tested solar modules; no hot-spot heating guaranteed.Advanced encapsulation material with multilayered sheet laminations to enhance cell performance and provide a long service life.Corrosion-resistant aluminum frame for extended outdoor use, allowing the panels to last for decades as well as withstand high winds (2400Pa.Anti-reflective, high transparency, low iron-tempered glass with enhanced stiffness and impact resistance..TPT back sheet ensures smooth performance over a long period of timeSpecificationsKey Features200Watts Solar Panel with 300Watt Inverter and 20A charge controllerHigh module conversion efficiency. Ideal output for single panel: 200Wh per day (depending on the availability of sunlight).Bypass diode minimizes power drop caused by shade and ensures excellent performance in low-light environmentswork with all weather even when there is mist and rainlyEL tested solar modules; no hot-spot heating guaranteed.Advanced encapsulation material with multilayered sheet laminations to enhance cell performance and provide a long service life.Corrosion-resistant aluminum frame for extended outdoor use, allowing the panels to last for decades as well as withstand high winds (2400Pa.Anti-reflective, high transparency, low iron-tempered glass with enhanced stiffness and impact resistance..TPT back sheet ensures smooth performance over a long period of timeWhat’s in the boxOne 200 Watts Solar PanelOne 300Watts inverterOne 20A charge controllerSpecificationsSKU: SO830LB1JACLENAFAMZCare Label: FRAGILEMain Material: Silicon,GlassProduction Country: ChinaSize (L x W x H cm): 1120 x80 x 8Weight (kg): 7Customer FeedbackThis product has no ratings yet.Product detailsSpecificationsCustomer Feedbacksolarmax 200Watts Solar Panel with 300Watt Inverter and 20A charge controllerKSh 18,500KSh 22,000-16%Add to cart
found row when checking
', 
'Key Features200Watts Solar Panel with 300Watt Inverter and 20A charge controllerHigh module conversion efficiency. Ideal output for single panel: 200Wh per day (depending on the availability of sunlight).Bypass diode minimizes power drop caused by shade and ensures excellent performance in low-light environmentswork with all weather even when there is mist and rainlyEL tested solar modules; no hot-spot heating guaranteed.Advanced encapsulation material with multilayered sheet laminations to enhance cell performance and provide a long service life.Corrosion-resistant aluminum frame for extended outdoor use, allowing the panels to last for decades as well as withstand high winds (2400Pa.Anti-reflective, high transparency, low iron-tempered glass with enhanced stiffness and impact resistance..TPT back sheet ensures smooth performance over a long period of timeWhat’s in the boxOne 200 Watts Solar PanelOne 300Watts inverterOne 20A charge controllerSpecificationsSKU: SO830LB1JACLENAFAMZCare Label: FRAGILEMain Material: Silicon,GlassProduction Country: ChinaSize (L x W x H cm): 1120 x80 x 8Weight (kg): 7
', 
'KSh 18,500', 
22000.00, 
'solarmax6.jpg', 
'solarmax6.jpg', 
'solarmax6.jpg', 
0),
(7, 
'solarmax Monocrystalline solar Panel - 80W - 18volts -', 
'Product detailsHigh module conversion efficiency. Ideal output for single panel: 80Wh per day (depending on the availability of sunlight).Bypass diode minimizes power drop caused by shade and ensures excellent performance in low-light environmentswork with all weather even when there is mist and rainyEL tested solar modules; no hot-spot heating guaranteed.Advanced encapsulation material with multilayered sheet lamination to enhance cell performance and provide a long service life.Corrosion-resistant aluminum frame for extended outdoor use, allowing the panels to last for decades as well as withstand high winds 2400Pa.Anti-reflective, high transparency, low iron-tempered glass with enhanced stiffness and impact resistance..TPT back sheet ensures smooth performance over a long period of timeorder online on Jumia and have it delivered at your doorstepSpecificationsKey Features80 watts 15v volts changing current 3.3 Amps  - 5.5 ampswork best with  12volts 45ah -80ah battery deep cycle battery or turbulence What’s in the box1 x solar panelSpecificationsSKU: SO830HL1JKWUANAFAMZWattage: 80wMain Material: metal and glassSize (L x W x H cm): 15 x 8.0 x4Weight (kg)', 
'Key Features80 watts 15v volts changing current 3.3 Amps  - 5.5 ampswork best with  12volts 45ah -80ah battery deep cycle battery or turbulence What’s in the box1 x solar panelSpecificationsSKU: SO830HL1JKWUANAFAMZWattage: 80wMain Material: metal and glassSize (L x W x H cm): 15 x 8.0 x4Weight (kg): 10', 
5990.00, 
10999.00, 
'solarmax7.jpg', 
'solarmax7.jpg', 
'solarmax7.jpg', 
0),
(8,
'solarmax 18Volt 50Watt Solar Panel Kit Polycrystalline + 20 Amp Solar Charger Controller with LCD', ' 
                                                        【Potential Uses】The 50 Watt Monocrystalline Panel can be 
used in various off-grid applications that include 12 and 24 volts 
arrays, water pumping systems, signaling systems and other off-grid 
application

                                                 
                                                        【Reliable】Advanced encapsulation material with multi-layered 
sheet laminations to enhance cell performance and provide a long service
 life. 100% EL testing on all modules; no hot-spot heating 
guaranteed. Bypass diodes minimize power drop caused by shade and ensure
 excellent performance in low-light environments. TPT back sheet ensures
 smooth performance over a long period of time

                                                 
                                                        【Durable】Guaranteed positive output tolerance (0-3%); withstands 
high winds (2400Pa) and snow loads (5400Pa). Corrosion-resistant 
aluminum frame for extended outdoor use, allowing the panels to last for
 decades. Anti-reflective, high transparency, low iron-tempered glass 
with enhanced stiffness and impact resistance. IP65 rated junction box 
provides complete protection against environmental particles and low 
pressure water jets

                                                 
                                                        【Versatile】Can be used for many different applications. Ground 
mount compatible. Compatible with on-grid and off-grid inverters

                                                 
                                                        【Installation Ready】Pre-drilled holes on the back of the panel 
allow for fast mounting and securing. Pre-drilled holes included for 
grounding. Compatible with different mounting systems such as 
Z-Brackets, Pole Mounts and Tilt Mounts
', 'SpecificationsKey FeaturesMax Power at STC (Pmax) = 50 wattOpen Circuit Voltage (Voc) = 22.7 VShort Circuit Current (Isc) = 2.84 AOptimum Operating Voltage (Vmp) = 18.5 VOptimum Operating Current (Imp) = 2.70 AMax System Voltage = 600VDC (UL)Max Series Fuse Rating = 15 AmpWhat’s in the box1. 50 Watt mono crystalline solar panelSpecificationsSKU: SO830HL192FOQNAFAMZCapacity (L): 1Wattage: 50wattsCare Label: FragileMain Material: Alluminium and siliconSize (L x W x H cm): 63*54*30Weight (kg): 3.8Customer FeedbackThis product has no ratings yet.Product detailsSpecificationsCustomer Feedbacksolarmax 18Volt 50Watt Solar Panel Kit Polycrystalline  + 20 Amp Solar Charger Controller with LCDKSh 6,999KSh 10,999-36%Add to cart
found row when checking
Key FeaturesMax Power at STC (Pmax) = 50 wattOpen Circuit Voltage (Voc) = 22.7 VShort Circuit Current (Isc) = 2.84 AOptimum Operating Voltage (Vmp) = 18.5 VOptimum Operating Current (Imp) = 2.70 AMax System Voltage = 600VDC (UL)Max Series Fuse Rating = 15 AmpWhat’s in the box1. 50 Watt mono crystalline solar panelSpecificationsSKU: SO830HL192FOQNAFAMZCapacity (L): 1Wattage: 50wattsCare Label: FragileMain Material: Alluminium and siliconSize (L x W x H cm): 63*54*30Weight (kg): 3.8
',
6999.00,
10999.00,
'solarmax8.jpg',
'solarmax8.jpg',
'solarmax8.jpg',
0),
(9, 'solarmax 200W Mono Crystalline Solar Panel,High Efficiency Cells
', 'roduct detailsMono-crystalline High efficiency Solar panel and 12 Volts output. The panel comes with a warranty of 25 years and are entirely made from high quality materials. This panel is ideal for home inverters, battery charging, street lighting and other applicationsKEY FEATURESType: mono crystalineUse: Inverter ChargingDurability: HighCell Efficiency: HighInstallation: Use Expert like usSolar panels trap the free energy of the sun for your use. It can be integrated into your existing installation of Inverter and Batteries', 'pecificationsKey FeaturesType: mono crystalineUse: Inverter ChargingDurability: HighCell Efficiency: HighInstallation: Use Expert like usSolar panels trap the free energy of the sun for your use. It can be integrated into your existing installation of Inverter and Batteries.What’s in the boxSolar PanelSpecificationsSKU: SO830HL0SJ0OQNAFAMZCapacity (L): 1Wattage: 200wattsMain Material: Metal and glassSize (L x W x H cm): 11.5 x 7 x 2.5Weight (kg): 15Customer FeedbackThis product has no ratings yet.Product detailsSpecificationsCustomer Feedbacksolarmax 200W Mono Crystalline Solar Panel,High Efficiency CellsKSh 20,999KSh 25,999-19%Add to cart
found row when checking
Key FeaturesType: mono crystalineUse: Inverter ChargingDurability: HighCell Efficiency: HighInstallation: Use Expert like usSolar panels trap the free energy of the sun for your use. It can be integrated into your existing installation of Inverter and Batteries.What’s in the boxSolar PanelSpecificationsSKU: SO830HL0SJ0OQNAFAMZCapacity (L): 1Wattage: 200wattsMain Material: Metal and glassSize (L x W x H cm): 11.5 x 7 x 2.5W',
20999.00,
25999.00,
'solarmax9.jpg',
'solarmax9.jpg',
'solarmax9.jpg',
0),
(10,
'solarmax 200Watts 18Volts Solar Panel',
' Product detailsUnder optimum conditions this panel will produce up to 10-11A of electrical current. This is at a cell temperature of 25°C, measured with a thermocouple from the back of the panel.  Its possible to generate more than 12 amps if at 0°Celsius, i.e. in snow and bright sunlight.High solar cell efficiency Monocrystalline 18.4%Bypass diodes minimize power drop caused by shade and ensure excellent performance in low-light environmentEL tested solar modules; no hot-spot heating guaranteedCorrosion-resistant aluminum frame for extended outdoor use, allowing the panels to last for decadesTPT back sheet ensures smooth performance over a long period of timeIP65 rated junction box provides complete protection against environmental particles and low pressure water jets', 'pecificationsKey FeaturesHigh solar cell efficiency Monocrystalline 18.4%Bypass diodes minimize power drop caused by shade and ensure excellent performance in low-light environmentEL tested solar modules; no hot-spot heating guaranteedCorrosion-resistant aluminum frame for extended outdoor use, allowing the panels to last for decadesTPT back sheet ensures smooth performance over a long period of timeIP65 rated junction box provides complete protection against environmental particles and low pressure water jetsWhat’s in the box1 x solar panelSpecificationsSKU: SO830HL1AFCN6NAFAMZCare Label: fragileMain Material: Steel and crystalline plasticSize (L x W x H cm): 158*80.8*0.35Weight (kg): 14.2Customer FeedbackThis product has no ratings yet.Product detailsSpecificationsCustomer Feedbacksolarmax 200Watts 18Volts Solar PanelKSh 19,199KSh 29,199-34%Add to cart
found row when checking
Key FeaturesHigh solar cell efficiency Monocrystalline 18.4%Bypass diodes minimize power drop caused by shade and ensure excellent performance in low-light environmentEL tested solar modules; no hot-spot heating guaranteedCorrosion-resistant aluminum frame for extended outdoor use, allowing the panels to last for decadesTPT back sheet ensures smooth performance over a long period of timeIP65 rated junction box provides complete protection against environmental particles and low pressure water jetsWhat’s in the box1 x solar panelSpecificationsSKU: SO830HL1AFCN6NAFAMZCare Label: fragileMain Material: Steel and crystalline plasticSize (L x W x H cm): 158*80.8*0.35Weight (kg)',
19199.00, 
29199.00, 
'solarmax10.jpg', 
'solarmax10.jpg', 
'solarmax10.jpg', 
0),
(11, 
'24v 275w suntech solar panel', 
'24V 275W Solar Panel with 25 Year out Warranty
60 cell formation
Excellent Low Light Performance
High Efficiency with High Transparency Low Iron Tempered Glass
Rugged Extruded and Anodized Aluminum Frame, Fully Sealed
41" Cable with MC4 Connector', 
'NEW', 
15273.00, 
15273.00, 
'suntech11.jpg', 
'suntech11.jpg', 
'suntech11.jpg', 
0),
(12, 
'Suntech Solar Module, 270W, PolyCrystalline, 60-cell, 25yrs Warranty, EIC, TUV, CE STP-270-20/Wfw', 
'DESCRIPTION:
This module is perfect for both residential and industrial roofs and has been tested in many climates. The 25 year warranty is also included with this module. Remember that the 250w – 290w range are almost always 60 cell modules, which are not suitable for battery charging except with a MPPT controller. In battery language, they are nominal 18v modules. If you use a PWM charge controller with these modules, you will harvest approximately half of the rated power.', 'Electrical Characteristics
Maximum Power at STC (Pmax) 275 W 270 W 265 W
Optimum Operating Voltage (Vmp) 31.2 V 31.1 V 31.0 V
Optimum Operating Current (Imp) 8.82 A 8.69 A 8.56 A
Open Circuit Voltage (Voc) 38.1 V 37.9 V 37.8 V
Short Circuit Current (Isc) 9.27 A 9.15 A 9.02 A
Module Efficiency 16.8% 16.5% 16.2%
Operating Module Temperature -40 °C to +85 °C
Maximum System Voltage 1000 V DC (IEC)
Maximum Series Fuse Rating 20 A
Power Tolerance 0/+5 W
Maximum Power at NOCT (Pmax) 200.6 W 198 W 194 W
Optimum Operating Voltage (Vmp) 28.5 V 28.4 V 28.3V
Optimum Operating Current (Imp) 7.05 A 6.97 A 6.86 A
Open Circuit Voltage (Voc) 34.8 V 34.9 V 34.8 V
Short Circuit Current (Isc) 7.5 A 7.42 A 7.32 A

Temperature Characteristics
Nominal Operating Cell Temperature (NOCT) 45±2°C
Temperature Coefficient of Pmax -0.41 %/°C
Temperature Coefficient of Voc -0.33 %/°C
Temperature Coefficient of Isc 0.067 %/°C

Mechanical Characteristics
Solar Cell Polycrystalline silicon 6 inches
No. of Cells 60 (6 × 10)
Dimensions 1650 × 992 × 35mm (64.96 × 39.1 × 1.4 inches)
Weight 18.3 kgs (40.3 lbs.)
Front Glass 3.2 mm (0.13 inches) tempered glass
Frame Anodized aluminium alloy
Junction Box IP68 rated (3 bypass diodes)
Output Cables 4.0 mm2
(0.006 inches2
), symmetrical lengths (-) 1000mm (39.4
inches) and (+) 1000 mm (39.4 inches)
Connectors MC4 compatible

Packing Configuration (Container 20’ GP 40’ HC)
Pieces per pallet 30 30
Pallets per container 6 28
Pieces per container 180 840
', 
14441.00, 
14441.00, 
'suntech12.jpg', 
'suntech12.jpg', 
'suntech12.jpg', 
0);










-- Populate product_category table
INSERT INTO `product_category` (`product_id`, `category_id`) VALUES
       (1, 1);

-- Populate attribute table
INSERT INTO `attribute` (`attribute_id`, `name`) VALUES
       (1, 'Size'), (2, 'Color');

-- Populate attribute_value table
INSERT INTO `attribute_value` (`attribute_value_id`, `attribute_id`, `value`) VALUES
       (1, 1, 'S'), (2, 1, 'M'), (3, 1, 'L'), (4, 1, 'XL'), (5, 1, 'XXL'),
       (6, 2, 'White'),  (7, 2, 'Black'), (8, 2, 'Red'), (9, 2, 'Orange'),
       (10, 2, 'Yellow'), (11, 2, 'Green'), (12, 2, 'Blue'),
       (13, 2, 'Indigo'), (14, 2, 'Purple');

-- Populate product_attribute table
INSERT INTO `product_attribute` (`product_id`, `attribute_value_id`)
       SELECT `p`.`product_id`, `av`.`attribute_value_id`
       FROM   `product` `p`, `attribute_value` `av`;

-- Populate shipping_region table
INSERT INTO `shipping_region` (`shipping_region_id`, `shipping_region`) VALUES
       (1, 'Please Select') , (2, 'Nairobi'),
       (3, 'Kisumu'),         (4, 'Rest of Kenya');

-- Populate shipping table
INSERT INTO `shipping` (`shipping_id`,   `shipping_type`,
                        `shipping_cost`, `shipping_region_id`) VALUES
       (1, 'Next Day Delivery ($20)', 20.00, 2),
       (2, '3-4 Days ($10)',          10.00, 2),
       (3, '7 Days ($5)',              5.00, 2),
       (4, 'By air (7 days, $25)',    25.00, 3),
       (5, 'By sea (28 days, $10)',   10.00, 3),
       (6, 'By air (10 days, $35)',   35.00, 4),
       (7, 'By sea (28 days, $30)',   30.00, 4);

-- Populate tax table
INSERT INTO `tax` (`tax_id`, `tax_type`, `tax_percentage`) VALUES
       (1, 'Sales Tax at 8.5%', 8.50),
       (2, 'No Tax',            0.00);

-- Change DELIMITER to $$
DELIMITER $$

-- Create catalog_get_departments_list stored procedure
CREATE PROCEDURE catalog_get_departments_list()
BEGIN
  SELECT department_id, name FROM department ORDER BY department_id;
END$$

-- Create catalog_get_department_details stored procedure
CREATE PROCEDURE catalog_get_department_details(IN inDepartmentId INT)
BEGIN
  SELECT name, description
  FROM   department
  WHERE  department_id = inDepartmentId;
END$$

-- Create catalog_get_categories_list stored procedure
CREATE PROCEDURE catalog_get_categories_list(IN inDepartmentId INT)
BEGIN
  SELECT   category_id, name
  FROM     category
  WHERE    department_id = inDepartmentId
  ORDER BY category_id;
END$$

-- Create catalog_get_category_details stored procedure
CREATE PROCEDURE catalog_get_category_details(IN inCategoryId INT)
BEGIN
  SELECT name, description
  FROM   category
  WHERE  category_id = inCategoryId;
END$$

-- Create catalog_count_products_in_category stored procedure
CREATE PROCEDURE catalog_count_products_in_category(IN inCategoryId INT)
BEGIN
  SELECT     COUNT(*) AS categories_count
  FROM       product p
  INNER JOIN product_category pc
               ON p.product_id = pc.product_id
  WHERE      pc.category_id = inCategoryId;
END$$

-- Create catalog_get_products_in_category stored procedure
CREATE PROCEDURE catalog_get_products_in_category(
  IN inCategoryId INT, IN inShortProductDescriptionLength INT,
  IN inProductsPerPage INT, IN inStartItem INT)
BEGIN
  -- Prepare statement
  PREPARE statement FROM
   "SELECT     p.product_id, p.name,
               IF(LENGTH(p.description) <= ?,
                  p.description,
                  CONCAT(LEFT(p.description, ?),
                         '...')) AS description,
               p.price, p.discounted_price, p.thumbnail, p.image
    FROM       product p
    INNER JOIN product_category pc
                 ON p.product_id = pc.product_id
    WHERE      pc.category_id = ?
    ORDER BY   p.display DESC
    LIMIT      ?, ?";

  -- Define query parameters
  SET @p1 = inShortProductDescriptionLength; 
  SET @p2 = inShortProductDescriptionLength; 
  SET @p3 = inCategoryId;
  SET @p4 = inStartItem; 
  SET @p5 = inProductsPerPage; 

  -- Execute the statement
  EXECUTE statement USING @p1, @p2, @p3, @p4, @p5;
END$$

-- Create catalog_count_products_on_department stored procedure
CREATE PROCEDURE catalog_count_products_on_department(IN inDepartmentId INT)
BEGIN
  SELECT DISTINCT COUNT(*) AS products_on_department_count
  FROM            product p
  INNER JOIN      product_category pc
                    ON p.product_id = pc.product_id
  INNER JOIN      category c
                    ON pc.category_id = c.category_id
  WHERE           (p.display = 2 OR p.display = 3)
                  AND c.department_id = inDepartmentId;
END$$

-- Create catalog_get_products_on_department stored procedure
CREATE PROCEDURE catalog_get_products_on_department(
  IN inDepartmentId INT, IN inShortProductDescriptionLength INT,
  IN inProductsPerPage INT, IN inStartItem INT)
BEGIN
  PREPARE statement FROM
    "SELECT DISTINCT p.product_id, p.name,
                     IF(LENGTH(p.description) <= ?,
                        p.description,
                        CONCAT(LEFT(p.description, ?),
                               '...')) AS description,
                     p.price, p.discounted_price, p.thumbnail, p.image, p.display
     FROM            product p
     INNER JOIN      product_category pc
                       ON p.product_id = pc.product_id
     INNER JOIN      category c
                       ON pc.category_id = c.category_id
     WHERE           (p.display = 2 OR p.display = 3)
                     AND c.department_id = ?
     ORDER BY        p.display DESC
     LIMIT           ?, ?";

  SET @p1 = inShortProductDescriptionLength;
  SET @p2 = inShortProductDescriptionLength;
  SET @p3 = inDepartmentId;
  SET @p4 = inStartItem;
  SET @p5 = inProductsPerPage;

  EXECUTE statement USING @p1, @p2, @p3, @p4, @p5;
END$$

-- Create catalog_count_products_on_catalog stored procedure
CREATE PROCEDURE catalog_count_products_on_catalog()
BEGIN
  SELECT COUNT(*) AS products_on_catalog_count
  FROM   product
  WHERE  display = 1 OR display = 3;
END$$

-- Create catalog_get_products_on_catalog stored procedure
CREATE PROCEDURE catalog_get_products_on_catalog(
  IN inShortProductDescriptionLength INT,
  IN inProductsPerPage INT, IN inStartItem INT)
BEGIN
  PREPARE statement FROM
    "SELECT   p.product_id, p.name,
              IF(LENGTH(p.description) <= ?,
                 p.description,
                 CONCAT(LEFT(p.description, ?),
                        '...')) AS description,
              p.price, p.discounted_price, p.thumbnail, p.display
     FROM     product p
     WHERE    p.display = 1 OR p.display = 3
     ORDER BY p.display DESC
     LIMIT    ?, ?";

  SET @p1 = inShortProductDescriptionLength;
  SET @p2 = inShortProductDescriptionLength;
  SET @p3 = inStartItem;
  SET @p4 = inProductsPerPage;

  EXECUTE statement USING @p1, @p2, @p3, @p4;
END$$

-- Create catalog_get_product_details stored procedure
CREATE PROCEDURE catalog_get_product_details(IN inProductId INT)
BEGIN
  SELECT product_id, name, description,
         price, discounted_price, image, image_2
  FROM   product
  WHERE  product_id = inProductId;
END$$

-- Create catalog_get_product_locations stored procedure
CREATE PROCEDURE catalog_get_product_locations(IN inProductId INT)
BEGIN
  SELECT c.category_id, c.name AS category_name, c.department_id,
         (SELECT name
          FROM   department
          WHERE  department_id = c.department_id) AS department_name
          -- Subquery returns the name of the department of the category
  FROM   category c
  WHERE  c.category_id IN
           (SELECT category_id
            FROM   product_category
            WHERE  product_id = inProductId);
            -- Subquery returns the category IDs a product belongs to
END$$

-- Create catalog_get_product_attributes stored procedure
CREATE PROCEDURE catalog_get_product_attributes(IN inProductId INT)
BEGIN
  SELECT     a.name AS attribute_name,
             av.attribute_value_id, av.value AS attribute_value
  FROM       attribute_value av
  INNER JOIN attribute a
               ON av.attribute_id = a.attribute_id
  WHERE      av.attribute_value_id IN
               (SELECT attribute_value_id
                FROM   product_attribute
                WHERE  product_id = inProductId)
  ORDER BY   a.name;
END$$

-- Create catalog_get_department_name stored procedure
CREATE PROCEDURE catalog_get_department_name(IN inDepartmentId INT)
BEGIN
  SELECT name FROM department WHERE department_id = inDepartmentId;
END$$

-- Create catalog_get_category_name stored procedure
CREATE PROCEDURE catalog_get_category_name(IN inCategoryId INT)
BEGIN
  SELECT name FROM category WHERE category_id = inCategoryId;
END$$

-- Create catalog_get_product_name stored procedure
CREATE PROCEDURE catalog_get_product_name(IN inProductId INT)
BEGIN
  SELECT name FROM product WHERE product_id = inProductId;
END$$

-- Create catalog_count_search_result stored procedure
CREATE PROCEDURE catalog_count_search_result(
  IN inSearchString TEXT, IN inAllWords VARCHAR(3))
BEGIN
  IF inAllWords = "on" THEN
    PREPARE statement FROM
      "SELECT   count(*)
       FROM     product
       WHERE    MATCH (name, description) AGAINST (? IN BOOLEAN MODE)";
  ELSE
    PREPARE statement FROM
      "SELECT   count(*)
       FROM     product
       WHERE    MATCH (name, description) AGAINST (?)";
  END IF;

  SET @p1 = inSearchString;

  EXECUTE statement USING @p1;
END$$

-- Create catalog_search stored procedure
CREATE PROCEDURE catalog_search(
  IN inSearchString TEXT, IN inAllWords VARCHAR(3),
  IN inShortProductDescriptionLength INT,
  IN inProductsPerPage INT, IN inStartItem INT)
BEGIN
  IF inAllWords = "on" THEN
    PREPARE statement FROM
      "SELECT   product_id, name, image,
                IF(LENGTH(description) <= ?,
                   description,
                   CONCAT(LEFT(description, ?),
                          '...')) AS description,
                price, discounted_price, thumbnail
       FROM     product
       WHERE    MATCH (name, description)
                AGAINST (? IN BOOLEAN MODE)
       ORDER BY MATCH (name, description)
                AGAINST (? IN BOOLEAN MODE) DESC
       LIMIT    ?, ?";
  ELSE
    PREPARE statement FROM
      "SELECT   product_id, name, image,
                IF(LENGTH(description) <= ?,
                   description,
                   CONCAT(LEFT(description, ?),
                          '...')) AS description,
                price, discounted_price, thumbnail
       FROM     product
       WHERE    MATCH (name, description) AGAINST (?)
       ORDER BY MATCH (name, description) AGAINST (?) DESC
       LIMIT    ?, ?";
  END IF;

  SET @p1 = inShortProductDescriptionLength;
  SET @p2 = inSearchString;
  SET @p3 = inStartItem;
  SET @p4 = inProductsPerPage;

  EXECUTE statement USING @p1, @p1, @p2, @p2, @p3, @p4;
END$$

-- Create catalog_get_departments stored procedure
CREATE PROCEDURE catalog_get_departments()
BEGIN
  SELECT   department_id, name, description
  FROM     department
  ORDER BY department_id;
END$$

-- Create catalog_add_department stored procedure
CREATE PROCEDURE catalog_add_department(
  IN inName VARCHAR(100), IN inDescription VARCHAR(1000))
BEGIN
  INSERT INTO department (name, description)
         VALUES (inName, inDescription);
END$$

-- Create catalog_update_department stored procedure
CREATE PROCEDURE catalog_update_department(IN inDepartmentId INT,
  IN inName VARCHAR(100), IN inDescription VARCHAR(1000))
BEGIN
  UPDATE department
  SET    name = inName, description = inDescription
  WHERE  department_id = inDepartmentId;
END$$

-- Create catalog_delete_department stored procedure
CREATE PROCEDURE catalog_delete_department(IN inDepartmentId INT)
BEGIN
  DECLARE categoryRowsCount INT;

  SELECT count(*)
  FROM   category
  WHERE  department_id = inDepartmentId
  INTO   categoryRowsCount;
  
  IF categoryRowsCount = 0 THEN
    DELETE FROM department WHERE department_id = inDepartmentId;

    SELECT 1;
  ELSE
    SELECT -1;
  END IF;
END$$

-- Create catalog_get_department_categories stored procedure
CREATE PROCEDURE catalog_get_department_categories(IN inDepartmentId INT)
BEGIN
  SELECT   category_id, name, description
  FROM     category
  WHERE    department_id = inDepartmentId
  ORDER BY category_id;
END$$

-- Create catalog_add_category stored procedure
CREATE PROCEDURE catalog_add_category(IN inDepartmentId INT,
  IN inName VARCHAR(100), IN inDescription VARCHAR(1000))
BEGIN
  INSERT INTO category (department_id, name, description)
         VALUES (inDepartmentId, inName, inDescription);
END$$

-- Create catalog_update_category stored procedure
CREATE PROCEDURE catalog_update_category(IN inCategoryId INT,
  IN inName VARCHAR(100), IN inDescription VARCHAR(1000))
BEGIN
    UPDATE category
    SET    name = inName, description = inDescription
    WHERE  category_id = inCategoryId;
END$$

-- Create catalog_delete_category stored procedure
CREATE PROCEDURE catalog_delete_category(IN inCategoryId INT)
BEGIN
  DECLARE productCategoryRowsCount INT;

  SELECT      count(*)
  FROM        product p
  INNER JOIN  product_category pc
                ON p.product_id = pc.product_id
  WHERE       pc.category_id = inCategoryId
  INTO        productCategoryRowsCount;

  IF productCategoryRowsCount = 0 THEN
    DELETE FROM category WHERE category_id = inCategoryId;

    SELECT 1;
  ELSE
    SELECT -1;
  END IF;
END$$

-- Create catalog_get_attributes stored procedure
CREATE PROCEDURE catalog_get_attributes()
BEGIN
  SELECT attribute_id, name FROM attribute ORDER BY attribute_id;
END$$

-- Create catalog_add_attribute stored procedure
CREATE PROCEDURE catalog_add_attribute(IN inName VARCHAR(100))
BEGIN
  INSERT INTO attribute (name) VALUES (inName);
END$$

-- Create catalog_update_attribute stored procedure
CREATE PROCEDURE catalog_update_attribute(
  IN inAttributeId INT, IN inName VARCHAR(100))
BEGIN
  UPDATE attribute SET name = inName WHERE attribute_id = inAttributeId;
END$$

-- Create catalog_delete_attribute stored procedure
CREATE PROCEDURE catalog_delete_attribute(IN inAttributeId INT)
BEGIN
  DECLARE attributeRowsCount INT;

  SELECT count(*)
  FROM   attribute_value
  WHERE  attribute_id = inAttributeId
  INTO   attributeRowsCount;

  IF attributeRowsCount = 0 THEN
    DELETE FROM attribute WHERE attribute_id = inAttributeId;

    SELECT 1;
  ELSE
    SELECT -1;
  END IF;
END$$

-- Create catalog_get_attribute_details stored procedure
CREATE PROCEDURE catalog_get_attribute_details(IN inAttributeId INT)
BEGIN
  SELECT attribute_id, name
  FROM   attribute
  WHERE  attribute_id = inAttributeId;
END$$

-- Create catalog_get_attribute_values stored procedure
CREATE PROCEDURE catalog_get_attribute_values(IN inAttributeId INT)
BEGIN
  SELECT   attribute_value_id, value
  FROM     attribute_value
  WHERE    attribute_id = inAttributeId
  ORDER BY attribute_id;
END$$

-- Create catalog_add_attribute_value stored procedure
CREATE PROCEDURE catalog_add_attribute_value(
  IN inAttributeId INT, IN inValue VARCHAR(100))
BEGIN
  INSERT INTO attribute_value (attribute_id, value)
         VALUES (inAttributeId, inValue);
END$$

-- Create catalog_update_attribute_value stored procedure
CREATE PROCEDURE catalog_update_attribute_value(
  IN inAttributeValueId INT, IN inValue VARCHAR(100))
BEGIN
    UPDATE attribute_value
    SET    value = inValue
    WHERE  attribute_value_id = inAttributeValueId;
END$$

-- Create catalog_delete_attribute_value stored procedure
CREATE PROCEDURE catalog_delete_attribute_value(IN inAttributeValueId INT)
BEGIN
  DECLARE productAttributeRowsCount INT;

  SELECT      count(*)
  FROM        product p
  INNER JOIN  product_attribute pa
                ON p.product_id = pa.product_id
  WHERE       pa.attribute_value_id = inAttributeValueId
  INTO        productAttributeRowsCount;

  IF productAttributeRowsCount = 0 THEN
    DELETE FROM attribute_value WHERE attribute_value_id = inAttributeValueId;

    SELECT 1;
  ELSE
    SELECT -1;
  END IF;
END$$

-- Create catalog_get_category_products stored procedure
CREATE PROCEDURE catalog_get_category_products(IN inCategoryId INT)
BEGIN
  SELECT     p.product_id, p.name, p.description, p.price,
             p.discounted_price
  FROM       product p
  INNER JOIN product_category pc
               ON p.product_id = pc.product_id
  WHERE      pc.category_id = inCategoryId
  ORDER BY   p.product_id;
END$$

-- Create catalog_add_product_to_category stored procedure
CREATE PROCEDURE catalog_add_product_to_category(IN inCategoryId INT,
  IN inName VARCHAR(100), IN inDescription VARCHAR(1000),
  IN inPrice DECIMAL(10, 2))
BEGIN
  DECLARE productLastInsertId INT;

  INSERT INTO product (name, description, price)
         VALUES (inName, inDescription, inPrice);

  SELECT LAST_INSERT_ID() INTO productLastInsertId;

  INSERT INTO product_category (product_id, category_id)
         VALUES (productLastInsertId, inCategoryId);
END$$

-- Create catalog_update_product stored procedure
CREATE PROCEDURE catalog_update_product(IN inProductId INT,
  IN inName VARCHAR(100), IN inDescription VARCHAR(1000),
  IN inPrice DECIMAL(10, 2), IN inDiscountedPrice DECIMAL(10, 2))
BEGIN
  UPDATE product
  SET    name = inName, description = inDescription, price = inPrice,
         discounted_price = inDiscountedPrice
  WHERE  product_id = inProductId;
END$$

-- Create catalog_remove_product_from_category stored procedure
CREATE PROCEDURE catalog_remove_product_from_category(
  IN inProductId INT, IN inCategoryId INT)
BEGIN
  DECLARE productCategoryRowsCount INT;

  SELECT count(*)
  FROM   product_category
  WHERE  product_id = inProductId
  INTO   productCategoryRowsCount;

  IF productCategoryRowsCount = 1 THEN
    CALL catalog_delete_product(inProductId);

    SELECT 0;
  ELSE
    DELETE FROM product_category
    WHERE  category_id = inCategoryId AND product_id = inProductId;

    SELECT 1;
  END IF;
END$$

-- Create catalog_get_categories stored procedure
CREATE PROCEDURE catalog_get_categories()
BEGIN
  SELECT   category_id, name, description
  FROM     category
  ORDER BY category_id;
END$$

-- Create catalog_get_product_info stored procedure
CREATE PROCEDURE catalog_get_product_info(IN inProductId INT)
BEGIN
  SELECT product_id, name, description, price, discounted_price,
         image, image_2, thumbnail, display
  FROM   product
  WHERE  product_id = inProductId;
END$$

-- Create catalog_get_categories_for_product stored procedure
CREATE PROCEDURE catalog_get_categories_for_product(IN inProductId INT)
BEGIN
  SELECT   c.category_id, c.department_id, c.name
  FROM     category c
  JOIN     product_category pc
             ON c.category_id = pc.category_id
  WHERE    pc.product_id = inProductId
  ORDER BY category_id;
END$$

-- Create catalog_set_product_display_option stored procedure
CREATE PROCEDURE catalog_set_product_display_option(
  IN inProductId INT, IN inDisplay SMALLINT)
BEGIN
  UPDATE product SET display = inDisplay WHERE product_id = inProductId;
END$$

-- Create catalog_assign_product_to_category stored procedure
CREATE PROCEDURE catalog_assign_product_to_category(
  IN inProductId INT, IN inCategoryId INT)
BEGIN
  INSERT INTO product_category (product_id, category_id)
         VALUES (inProductId, inCategoryId);
END$$

-- Create catalog_move_product_to_category stored procedure
CREATE PROCEDURE catalog_move_product_to_category(IN inProductId INT,
  IN inSourceCategoryId INT, IN inTargetCategoryId INT)
BEGIN
  UPDATE product_category
  SET    category_id = inTargetCategoryId
  WHERE  product_id = inProductId
         AND category_id = inSourceCategoryId;
END$$

-- Create catalog_get_attributes_not_assigned_to_product stored procedure
CREATE PROCEDURE catalog_get_attributes_not_assigned_to_product(
  IN inProductId INT)
BEGIN
  SELECT     a.name AS attribute_name,
             av.attribute_value_id, av.value AS attribute_value
  FROM       attribute_value av
  INNER JOIN attribute a
               ON av.attribute_id = a.attribute_id
  WHERE      av.attribute_value_id NOT IN
             (SELECT attribute_value_id
              FROM   product_attribute
              WHERE  product_id = inProductId)
  ORDER BY   attribute_name, av.attribute_value_id;
END$$

-- Create catalog_assign_attribute_value_to_product stored procedure
CREATE PROCEDURE catalog_assign_attribute_value_to_product(
  IN inProductId INT, IN inAttributeValueId INT)
BEGIN
  INSERT INTO product_attribute (product_id, attribute_value_id)
         VALUES (inProductId, inAttributeValueId);
END$$

-- Create catalog_remove_product_attribute_value stored procedure
CREATE PROCEDURE catalog_remove_product_attribute_value(
  IN inProductId INT, IN inAttributeValueId INT)
BEGIN
  DELETE FROM product_attribute
  WHERE       product_id = inProductId AND
              attribute_value_id = inAttributeValueId;
END$$

-- Create catalog_set_image stored procedure
CREATE PROCEDURE catalog_set_image(
  IN inProductId INT, IN inImage VARCHAR(150))
BEGIN
  UPDATE product SET image = inImage WHERE product_id = inProductId;
END$$

-- Create catalog_set_image_2 stored procedure
CREATE PROCEDURE catalog_set_image_2(
  IN inProductId INT, IN inImage VARCHAR(150))
BEGIN
  UPDATE product SET image_2 = inImage WHERE product_id = inProductId;
END$$

-- Create catalog_set_thumbnail stored procedure
CREATE PROCEDURE catalog_set_thumbnail(
  IN inProductId INT, IN inThumbnail VARCHAR(150))
BEGIN
  UPDATE product
  SET    thumbnail = inThumbnail
  WHERE  product_id = inProductId;
END$$

-- Create shopping_cart_add_product stored procedure
CREATE PROCEDURE shopping_cart_add_product(IN inCartId CHAR(32),
  IN inProductId INT, IN inAttributes VARCHAR(1000))
BEGIN
  DECLARE productQuantity INT;

  -- Obtain current shopping cart quantity for the product
  SELECT quantity
  FROM   shopping_cart
  WHERE  cart_id = inCartId
         AND product_id = inProductId
         AND attributes = inAttributes
  INTO   productQuantity;

  -- Create new shopping cart record, or increase quantity of existing record
  IF productQuantity IS NULL THEN
    INSERT INTO shopping_cart(item_id, cart_id, product_id, attributes,
                              quantity, added_on)
           VALUES (UUID(), inCartId, inProductId, inAttributes, 1, NOW());
  ELSE
    UPDATE shopping_cart
    SET    quantity = quantity + 1, buy_now = true
    WHERE  cart_id = inCartId
           AND product_id = inProductId
           AND attributes = inAttributes;
  END IF;
END$$

-- Create shopping_cart_update_product stored procedure
CREATE PROCEDURE shopping_cart_update(IN inItemId INT, IN inQuantity INT)
BEGIN
  IF inQuantity > 0 THEN
    UPDATE shopping_cart
    SET    quantity = inQuantity, added_on = NOW()
    WHERE  item_id = inItemId;
  ELSE
    CALL shopping_cart_remove_product(inItemId);
  END IF;
END$$

-- Create shopping_cart_remove_product stored procedure
CREATE PROCEDURE shopping_cart_remove_product(IN inItemId VARCHAR(255))
BEGIN
  DELETE FROM shopping_cart WHERE item_id = inItemId;
END$$

-- Create shopping_cart_get_products stored procedure
CREATE PROCEDURE shopping_cart_get_products(IN inCartId CHAR(32))
BEGIN
  SELECT     sc.item_id, p.name, p.image, sc.attributes,
             COALESCE(NULLIF(p.discounted_price, 0), p.price) AS price,
             sc.quantity,
             COALESCE(NULLIF(p.discounted_price, 0),
                      p.price) * sc.quantity AS subtotal
  FROM       shopping_cart sc
  INNER JOIN product p
               ON sc.product_id = p.product_id
  WHERE      sc.cart_id = inCartId AND sc.buy_now;
END$$

-- Create shopping_cart_get_saved_products stored procedure
CREATE PROCEDURE shopping_cart_get_saved_products(IN inCartId CHAR(32))
BEGIN
  SELECT     sc.item_id, p.name, sc.attributes,
             COALESCE(NULLIF(p.discounted_price, 0), p.price) AS price
  FROM       shopping_cart sc
  INNER JOIN product p
               ON sc.product_id = p.product_id
  WHERE      sc.cart_id = inCartId AND NOT sc.buy_now;
END$$

-- Create shopping_cart_get_total_amount stored procedure
CREATE PROCEDURE shopping_cart_get_total_amount(IN inCartId CHAR(32))
BEGIN
  SELECT     SUM(COALESCE(NULLIF(p.discounted_price, 0), p.price)
                 * sc.quantity) AS total_amount
  FROM       shopping_cart sc
  INNER JOIN product p
               ON sc.product_id = p.product_id
  WHERE      sc.cart_id = inCartId AND sc.buy_now;
END$$

-- Create shopping_cart_save_product_for_later stored procedure
CREATE PROCEDURE shopping_cart_save_product_for_later(IN inItemId INT)
BEGIN
  UPDATE shopping_cart
  SET    buy_now = false, quantity = 1
  WHERE  item_id = inItemId;
END$$

-- Create shopping_cart_move_product_to_cart stored procedure
CREATE PROCEDURE shopping_cart_move_product_to_cart(IN inItemId INT)
BEGIN
  UPDATE shopping_cart
  SET    buy_now = true, added_on = NOW()
  WHERE  item_id = inItemId;
END$$

-- Create catalog_delete_product stored procedure
CREATE PROCEDURE catalog_delete_product(IN inProductId INT)
BEGIN
  DELETE FROM product_attribute WHERE product_id = inProductId;
  DELETE FROM product_category WHERE product_id = inProductId;
  DELETE FROM shopping_cart WHERE product_id = inProductId;
  DELETE FROM product WHERE product_id = inProductId;
END$$

-- Create shopping_cart_count_old_carts stored procedure
CREATE PROCEDURE shopping_cart_count_old_carts(IN inDays INT)
BEGIN
  SELECT COUNT(cart_id) AS old_shopping_carts_count
  FROM   (SELECT   cart_id
          FROM     shopping_cart
          GROUP BY cart_id
          HAVING   DATE_SUB(NOW(), INTERVAL inDays DAY) >= MAX(added_on))
         AS old_carts;
END$$

-- Create shopping_cart_delete_old_carts stored procedure
CREATE PROCEDURE shopping_cart_delete_old_carts(IN inDays INT)
BEGIN
  DELETE FROM shopping_cart
  WHERE  cart_id IN
          (SELECT cart_id
           FROM   (SELECT   cart_id
                   FROM     shopping_cart
                   GROUP BY cart_id
                   HAVING   DATE_SUB(NOW(), INTERVAL inDays DAY) >=
                            MAX(added_on))
                  AS sc);
END$$

-- Create shopping_cart_empty stored procedure
CREATE PROCEDURE shopping_cart_empty(IN inCartId CHAR(32))
BEGIN
  DELETE FROM shopping_cart WHERE cart_id = inCartId;
END$$

-- Create orders_get_order_details stored procedure
CREATE PROCEDURE orders_get_order_details(IN inOrderId INT)
BEGIN
  SELECT order_id, product_id, attributes, product_name,
         quantity, unit_cost, (quantity * unit_cost) AS subtotal
  FROM   order_detail
  WHERE  order_id = inOrderId;
END$$

-- Create catalog_get_recommendations stored procedure
CREATE PROCEDURE catalog_get_recommendations(
  IN inProductId INT, IN inShortProductDescriptionLength INT)
BEGIN
  PREPARE statement FROM
    "SELECT   od2.product_id, od2.product_name,
              IF(LENGTH(p.description) <= ?, p.description,
                 CONCAT(LEFT(p.description, ?), '...')) AS description
     FROM     order_detail od1
     JOIN     order_detail od2 ON od1.order_id = od2.order_id
     JOIN     product p ON od2.product_id = p.product_id
     WHERE    od1.product_id = ? AND
              od2.product_id != ?
     GROUP BY od2.product_id
     ORDER BY COUNT(od2.product_id) DESC
     LIMIT 5";

  SET @p1 = inShortProductDescriptionLength;
  SET @p2 = inProductId;

  EXECUTE statement USING @p1, @p1, @p2, @p2;
END$$

-- Create shopping_cart_get_recommendations stored procedure
CREATE PROCEDURE shopping_cart_get_recommendations(
  IN inCartId CHAR(32), IN inShortProductDescriptionLength INT)
BEGIN
  PREPARE statement FROM
    "-- Returns the products that exist in a list of orders
     SELECT   od1.product_id, od1.product_name,
              IF(LENGTH(p.description) <= ?, p.description,
                 CONCAT(LEFT(p.description, ?), '...')) AS description
     FROM     order_detail od1
     JOIN     order_detail od2
                ON od1.order_id = od2.order_id
     JOIN     product p
                ON od1.product_id = p.product_id
     JOIN     shopping_cart
                ON od2.product_id = shopping_cart.product_id
     WHERE    shopping_cart.cart_id = ?
              -- Must not include products that already exist
              -- in the visitor's cart
              AND od1.product_id NOT IN
              (-- Returns the products in the specified
               -- shopping cart
               SELECT product_id
               FROM   shopping_cart
               WHERE  cart_id = ?)
     -- Group the product_id so we can calculate the rank
     GROUP BY od1.product_id
     -- Order descending by rank
     ORDER BY COUNT(od1.product_id) DESC
     LIMIT    5";

  SET @p1 = inShortProductDescriptionLength;
  SET @p2 = inCartId;

  EXECUTE statement USING @p1, @p1, @p2, @p2;
END$$

-- Create customer_get_login_info stored procedure
CREATE PROCEDURE customer_get_login_info(IN inEmail VARCHAR(100))
BEGIN
  SELECT customer_id, password FROM customer WHERE email = inEmail;
END$$

-- Create customer_add stored procedure
CREATE PROCEDURE customer_add(IN inName VARCHAR(50),
  IN inEmail VARCHAR(100), IN inPassword VARCHAR(50))
BEGIN
  INSERT INTO customer (name, email, password)
         VALUES (inName, inEmail, inPassword);

  SELECT LAST_INSERT_ID();
END$$

-- Create customer_get_customer stored procedure
CREATE PROCEDURE customer_get_customer(IN inCustomerId INT)
BEGIN
  SELECT customer_id, name, email, password, credit_card,
         address_1, address_2, city, region, postal_code, country,
         shipping_region_id, day_phone, eve_phone, mob_phone
  FROM   customer
  WHERE  customer_id = inCustomerId;
END$$

-- Create customer_update_account stored procedure
CREATE PROCEDURE customer_update_account(IN inCustomerId INT,
  IN inName VARCHAR(50), IN inEmail VARCHAR(100),
  IN inPassword VARCHAR(50), IN inDayPhone VARCHAR(100),
  IN inEvePhone VARCHAR(100), IN inMobPhone VARCHAR(100))
BEGIN
  UPDATE customer
  SET    name = inName, email = inEmail,
         password = inPassword, day_phone = inDayPhone,
         eve_phone = inEvePhone, mob_phone = inMobPhone
  WHERE  customer_id = inCustomerId;
END$$

-- Create customer_update_credit_card stored procedure
CREATE PROCEDURE customer_update_credit_card(
  IN inCustomerId INT, IN inCreditCard TEXT)
BEGIN
  UPDATE customer
  SET    credit_card = inCreditCard
  WHERE  customer_id = inCustomerId;
END$$

-- Create customer_get_shipping_regions stored procedure
CREATE PROCEDURE customer_get_shipping_regions()
BEGIN
  SELECT shipping_region_id, shipping_region FROM shipping_region;
END$$

-- Create customer_update_address stored procedure
CREATE PROCEDURE customer_update_address(IN inCustomerId INT,
  IN inAddress1 VARCHAR(100), IN inAddress2 VARCHAR(100),
  IN inCity VARCHAR(100), IN inRegion VARCHAR(100),
  IN inPostalCode VARCHAR(100), IN inCountry VARCHAR(100),
  IN inShippingRegionId INT)
BEGIN
  UPDATE customer
  SET    address_1 = inAddress1, address_2 = inAddress2, city = inCity,
         region = inRegion, postal_code = inPostalCode,
         country = inCountry, shipping_region_id = inShippingRegionId
  WHERE  customer_id = inCustomerId;
END$$

-- Create orders_get_most_recent_orders stored procedure
CREATE PROCEDURE orders_get_most_recent_orders(IN inHowMany INT)
BEGIN
  PREPARE statement FROM
    "SELECT     o.order_id, o.total_amount, o.created_on,
                o.shipped_on, o.status, c.name
     FROM       orders o
     INNER JOIN customer c
                  ON o.customer_id = c.customer_id
     ORDER BY   o.created_on DESC
     LIMIT      ?";

  SET @p1 = inHowMany;

  EXECUTE statement USING @p1;
END$$

-- Create orders_get_orders_between_dates stored procedure
CREATE PROCEDURE orders_get_orders_between_dates(
  IN inStartDate DATETIME, IN inEndDate DATETIME)
BEGIN
  SELECT     o.order_id, o.total_amount, o.created_on,
             o.shipped_on, o.status, c.name
  FROM       orders o
  INNER JOIN customer c
               ON o.customer_id = c.customer_id
  WHERE      o.created_on >= inStartDate AND o.created_on <= inEndDate
  ORDER BY   o.created_on DESC;
END$$

-- Create orders_get_orders_by_status stored procedure
CREATE PROCEDURE orders_get_orders_by_status(IN inStatus INT)
BEGIN
  SELECT     o.order_id, o.total_amount, o.created_on,
             o.shipped_on, o.status, c.name
  FROM       orders o
  INNER JOIN customer c
               ON o.customer_id = c.customer_id
  WHERE      o.status = inStatus
  ORDER BY   o.created_on DESC;
END$$

-- Create orders_get_by_customer_id stored procedure
CREATE PROCEDURE orders_get_by_customer_id(IN inCustomerId INT)
BEGIN
  SELECT     o.order_id, o.total_amount, o.created_on,
             o.shipped_on, o.status, c.name
  FROM       orders o
  INNER JOIN customer c
               ON o.customer_id = c.customer_id
  WHERE      o.customer_id = inCustomerId
  ORDER BY   o.created_on DESC;
END$$

-- Create orders_get_order_short_details stored procedure
CREATE PROCEDURE orders_get_order_short_details(IN inOrderId INT)
BEGIN
  SELECT      o.order_id, o.total_amount, o.created_on,
              o.shipped_on, o.status, c.name
  FROM        orders o
  INNER JOIN  customer c
                ON o.customer_id = c.customer_id
  WHERE       o.order_id = inOrderId;
END$$

-- Create customer_get_customers_list stored procedure
CREATE PROCEDURE customer_get_customers_list()
BEGIN
  SELECT customer_id, name FROM customer ORDER BY name ASC;
END$$

-- Create shopping_cart_create_order stored procedure
CREATE PROCEDURE shopping_cart_create_order(IN inCartId CHAR(32),
  IN inCustomerId INT, IN inShippingId INT, IN inTaxId INT)
BEGIN
  DECLARE orderId INT;

  -- Insert a new record into orders and obtain the new order ID
  INSERT INTO orders (created_on, customer_id, shipping_id, tax_id) VALUES
         (NOW(), inCustomerId, inShippingId, inTaxId);
  -- Obtain the new Order ID
  SELECT LAST_INSERT_ID() INTO orderId;

  -- Insert order details in order_detail table
  INSERT INTO order_detail (order_id, product_id, attributes,
                            product_name, quantity, unit_cost)
  SELECT      orderId, p.product_id, sc.attributes, p.name, sc.quantity,
              COALESCE(NULLIF(p.discounted_price, 0), p.price) AS unit_cost
  FROM        shopping_cart sc
  INNER JOIN  product p
                ON sc.product_id = p.product_id
  WHERE       sc.cart_id = inCartId AND sc.buy_now;

  -- Save the order's total amount
  UPDATE orders
  SET    total_amount = (SELECT SUM(unit_cost * quantity) 
                         FROM   order_detail
                         WHERE  order_id = orderId)
  WHERE  order_id = orderId;

  -- Clear the shopping cart
  CALL shopping_cart_empty(inCartId);

  -- Return the Order ID
  SELECT orderId;
END$$

-- Create orders_get_order_info stored procedure
CREATE PROCEDURE orders_get_order_info(IN inOrderId INT)
BEGIN
  SELECT     o.order_id, o.total_amount, o.created_on, o.shipped_on,
             o.status, o.comments, o.customer_id, o.auth_code,
             o.reference, o.shipping_id, s.shipping_type, s.shipping_cost,
             o.tax_id, t.tax_type, t.tax_percentage
  FROM       orders o
  INNER JOIN tax t
               ON t.tax_id = o.tax_id
  INNER JOIN shipping s
               ON s.shipping_id = o.shipping_id
  WHERE      o.order_id = inOrderId;
END$$

-- Create orders_get_shipping_info stored procedure
CREATE PROCEDURE orders_get_shipping_info(IN inShippingRegionId INT)
BEGIN
  SELECT shipping_id, shipping_type, shipping_cost, shipping_region_id
  FROM   shipping
  WHERE  shipping_region_id = inShippingRegionId;
END$$

-- Create orders_create_audit stored procedure
CREATE PROCEDURE orders_create_audit(IN inOrderId INT,
  IN inMessage TEXT, IN inCode INT)
BEGIN
  INSERT INTO audit (order_id, created_on, message, code)
         VALUES (inOrderId, NOW(), inMessage, inCode);
END$$

-- Create orders_update_status stored procedure
CREATE PROCEDURE orders_update_status(IN inOrderId INT, IN inStatus INT)
BEGIN
  UPDATE orders SET status = inStatus WHERE order_id = inOrderId;
END$$

-- Create orders_set_auth_code stored procedure
CREATE PROCEDURE orders_set_auth_code(IN inOrderId INT,
  IN inAuthCode VARCHAR(50), IN inReference VARCHAR(50))
BEGIN
  UPDATE orders
  SET    auth_code = inAuthCode, reference = inReference
  WHERE  order_id = inOrderId;
END$$

-- Create orders_set_date_shipped stored procedure
CREATE PROCEDURE orders_set_date_shipped(IN inOrderId INT)
BEGIN
  UPDATE orders SET shipped_on = NOW() WHERE order_id = inOrderId;
END$$

-- Create orders_update_order stored procedure
CREATE PROCEDURE orders_update_order(IN inOrderId INT, IN inStatus INT,
  IN inComments VARCHAR(255), IN inAuthCode VARCHAR(50),
  IN inReference VARCHAR(50))
BEGIN
  DECLARE currentDateShipped DATETIME;

  SELECT shipped_on
  FROM   orders
  WHERE  order_id = inOrderId
  INTO   currentDateShipped;

  UPDATE orders
  SET    status = inStatus, comments = inComments,
         auth_code = inAuthCode, reference = inReference
  WHERE  order_id = inOrderId;

  IF inStatus < 7 AND currentDateShipped IS NOT NULL THEN
    UPDATE orders SET shipped_on = NULL WHERE order_id = inOrderId;
  ELSEIF inStatus > 6 AND currentDateShipped IS NULL THEN
    UPDATE orders SET shipped_on = NOW() WHERE order_id = inOrderId;
  END IF;
END$$

-- Create orders_get_audit_trail stored procedure
CREATE PROCEDURE orders_get_audit_trail(IN inOrderId INT)
BEGIN
  SELECT audit_id, order_id, created_on, message, code
  FROM   audit
  WHERE  order_id = inOrderId;
END$$

-- Create catalog_get_product_reviews stored procedure
CREATE PROCEDURE catalog_get_product_reviews(IN inProductId INT)
BEGIN
  SELECT     c.name, r.review, r.rating, r.created_on
  FROM       review r
  INNER JOIN customer c
               ON c.customer_id = r.customer_id
  WHERE      r.product_id = inProductId
  ORDER BY   r.created_on DESC;
END$$

-- Create catalog_create_product_review stored procedure
CREATE PROCEDURE catalog_create_product_review(IN inCustomerId INT,
  IN inProductId INT, IN inReview TEXT, IN inRating SMALLINT)
BEGIN
  INSERT INTO review (customer_id, product_id, review, rating, created_on)
         VALUES (inCustomerId, inProductId, inReview, inRating, NOW());
END$$

-- Change back DELIMITER to ;
DELIMITER ;
