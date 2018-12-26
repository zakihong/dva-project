/*
Navicat MySQL Data Transfer

Source Server         : 172.16.42.206
Source Server Version : 50560
Source Host           : 172.16.42.206:3306
Source Database       : rrs

Target Server Type    : MYSQL
Target Server Version : 50560
File Encoding         : 65001

Date: 2018-12-26 17:24:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` varchar(16) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `descption` text NOT NULL,
  `content` text,
  `pic` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `view-count` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '1',
  `category-id` int(11) DEFAULT NULL,
  `publish-time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('71e4d965-04c2-49', '防刺网及周界报警', 'dsadad', '<p>dsadadad</p>\n', 'http://172.16.42.205:7001/upload/article/15458099064919555.png', '3', '0', '1', '0', null);
INSERT INTO `article` VALUES ('e9d3adf8-89d1-42', '我的第一篇文章', '这是我的第一篇文章', '<p>这是我的第一篇文章</p>\n<p></p>\n<img src=\"http://172.16.42.205:7001/upload/editor/154580908099271.png\" alt=\"hoho\" style=\"float:none;height: 80px;width: 80px\"/>\n<p></p>\n', 'http://172.16.42.205:7001/upload/article/15458090566817759.png', '3', '0', '1', '0', null);

-- ----------------------------
-- Table structure for `category`
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('077af731-7616-4d5e-a3d6-d369fc2a951c', 'Web前端', '1');
INSERT INTO `category` VALUES ('5a6dae6a-9ac0-413c-8aec-d42adec1587f', 'React', '1');
INSERT INTO `category` VALUES ('d3becbad-802f-45fb-a3d1-8046e6d64e3a', '趣事杂文', '1');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(16) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `photo` varchar(255) NOT NULL,
  `nikename` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('06a2caeb-7d4c-49', 'admin', 'admin', 'http://172.16.42.205:7001/upload/user/15457235988129807.jpg', '超级管理员', '2018-12-25 15:40:04', '2018-12-25 15:40:04', '1');
INSERT INTO `user` VALUES ('d46f2cd1-b4ad-4e', 'wxm', 'wxm', 'http://172.16.42.205:7001/upload/user/15458126231433669.png', '王小萌', '2018-12-26 16:23:45', '2018-12-26 16:23:45', '1');
