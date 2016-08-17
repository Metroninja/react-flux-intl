# ![ninjabam](http://silhouettesfree.com/professions-and-occupations/ninja/ninja-silhouette-image-2.png) Ninjabam React-Flux-Intl
***

Ninjabam react-flux-intl docker frontend application
Baseline examples of all the React stuff built for the followerwonk V2 frontend while @Moz.

***

## Dev Box Dependencies
My prefered method is to keep my dev environment completely separate so I run docker inside a vagrant.
The checked in vagrant file is using an image for the vmware provider, but if you are using virtual box 
just use any of the 16.04 images [listed here](https://atlas.hashicorp.com/boxes/search?provider=virtualbox&q=16.04&sort=&utf8=%E2%9C%93)


#Vware specific vagrant setup
if you are running vware with vagrant, you'll need to do some additional configuration as you will encounter errors with 
the shared folder mounting.  do the following

```
sudo apt-get install -y build-essential linux-headers-$(uname -r)
echo "answer AUTO_KMODS_ENABLED yes" | sudo tee -a /etc/vmware-tools/locations
```

#Docker Setup
for docker setup, if the steps below fall off over time check out [the docker documenation](https://docs.docker.com/engine/installation/linux/ubuntulinux/). 

```
 sudo apt-get update
 sudo apt-get install apt-transport-https ca-certificates
 sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
```

now you'll need do add your docker sources, so `vi /etc/apt/sources.list.d/docker.list` clear out any existing entries (if there are any) and add `deb https://apt.dockerproject.org/repo ubuntu-xenial main`

save, and then move on:
```
sudo apt-get update
sudo apt-get purge lxc-docker
sudo apt-get install linux-image-extra-$(uname -r)
sudo apt-get install docker-engine
sudo service docker start

sudo curl -L https://github.com/docker/compose/releases/download/1.8.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```