# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure('2') do |config|

  config.vm.box = 'boxcutter/ubuntu1604'
  config.vm.provider = "virtualbox"
  config.vm.hostname = 'ninjabam-react'
  config.ssh.forward_agent = true
  config.vm.network :forwarded_port, guest: 3001, host: 3001
  config.vm.network :forwarded_port, guest: 3003, host: 3003
  config.vm.synced_folder '.', '/vagrant'
end
