variable "cluster-context" {
  type    = string
  default = "k3d-ndi"
}

variable "config-path" {
  type    = string
  default = "~/.kube/config"
}
