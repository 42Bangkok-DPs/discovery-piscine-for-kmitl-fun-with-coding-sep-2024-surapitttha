#!/bin/bash


if [ $# -eq 0 ]; then
  echo "No arguments supplied"
  exit 1
fi


for arg in "$@"; do
  folder_name="ex$arg"

  if [ ! -d "$folder_name" ]; then
    mkdir "$folder_name"
    echo "Directory $folder_name created"
  else
    echo "Directory $folder_name already exists"
  fi
done
