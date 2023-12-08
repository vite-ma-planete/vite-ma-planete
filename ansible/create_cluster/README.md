### Configuring Ansible :

- Edit the `inventory.ini` file :

  - On the first line, replace the master's IP with one of your machine, and indicate the path to the private key you used during allocation.
  - For the k3d-master role, put the name of your first machine in the inventory

### Running the script :

Make sure you have ansible package installed on your machine, then run `ansible-playground main.yaml`.

Let the script run, and you should be all set !

The script will copy the kubeconfig file to a `~/.kube/vite_ma_planete_cluster_config` file. You still need to manually update the IP address to point to the master.
