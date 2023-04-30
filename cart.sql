CREATE TABLE `product_cart` (
  `product_id`         INT NOT NULL,
  `cart_id` VARCHAR(1000),
  `item_id`     VARCHAR(1000) NOT NULL
) ENGINE=MyISAM;

-- CREATE TABLE `shopping_cart` (
--   `item_id`     VARCHAR(1000) NOT NULL,
--   `cart_id`     VARCHAR(1000) NOT NULL,
--   `product_id`  INT           NOT NULL,
--   `attributes`  VARCHAR(1000) NOT NULL,
--   `quantity`    INT           NOT NULL,
--   `buy_now`     BOOL          NOT NULL  DEFAULT true,
--   `added_on`    DATETIME      NOT NULL
-- --   PRIMARY KEY (`cart_id`)
-- --   KEY `idx_shopping_cart_cart_id` (`cart_id`)
-- ) ENGINE=MyISAM;