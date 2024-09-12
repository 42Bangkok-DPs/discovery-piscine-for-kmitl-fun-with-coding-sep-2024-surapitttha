#!/bin/bash

# ตรวจสอบว่ามีการส่ง arguments มาหรือไม่
if [ $# -eq 0 ]; then
  echo "No arguments supplied"
  exit 1
fi

# วนลูปผ่าน arguments ที่ส่งมา
for arg in "$@"; do
  folder_name="ex$arg"
  # สร้างโฟลเดอร์ถ้ายังไม่มี
  if [ ! -d "$folder_name" ]; then
    mkdir "$folder_name"
    echo "Directory $folder_name created"
  else
    echo "Directory $folder_name already exists"
  fi
done
