provider "kubernetes" {
  config_path    = var.config-path
  config_context = var.cluster-context
}

provider "helm" {
  kubernetes {
    config_path    = var.config-path
    config_context = var.cluster-context
  }
}
