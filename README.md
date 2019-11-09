## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|
|password|string|null: false|
### Association
  has_many :massages
  has_many :groups, through: :group_users
## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_id|integer|
|user_id|integer|
### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|name|string|null: false|
|member|string|null: false|
### Association
  has_many :massages
  has_many :users, through: :group_users

## groups_users テーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
  belongs_to :user
  belongs_to :group  
