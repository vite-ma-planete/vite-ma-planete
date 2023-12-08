variable "kubeconfig_context_name" {
  type    = string
  default = "k3d-vite-ma-planete"
}

variable "kubeconfig_path" {
  type    = string
  default = "~/.kube/vite_ma_planete_cluster_config"
}
