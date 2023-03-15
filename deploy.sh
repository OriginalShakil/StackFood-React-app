git pull
pm2 delete "stackfood-next-js"
pm2 start npm --name "stackfood-next-js" -- start
