#!/usr/bin/bash

user=$1

declare -A names=( [samer]="Samer Haj" [majd]="Majd Assad" [mohamed]="Mohamed Sayed Ahmed" [jeries]="Jeries Nesery")
declare -A emails=( [samer]="samerhaj44@gmail.com" [majd]="majdassad123@gmail.com" [mohamed]="" [jeries]="" )

echo "Updated Name: ${names[$user]}"
echo "Updated Email: ${emails[$user]}"

git config --global --replace-all user.name "${names[$user]}"
git config --global --replace-all user.email "${emails[$user]}"
git config -l