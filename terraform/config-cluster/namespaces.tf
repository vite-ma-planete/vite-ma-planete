resource "kubernetes_namespace" "ingress_nginx_namespace" {
  metadata {
    name = "nginx-ingress"
  }
}

resource "kubernetes_namespace" "cert_manager_namespace" {
  metadata {
    name = "cert-manager"
  }
}

resource "kubernetes_namespace" "argocd_namespace" {
  metadata {
    name = "argocd"
  }
}

resource "kubernetes_namespace" "sealed_secrets_namespace" {
  metadata {
    name = "sealed-secrets"
  }
}

resource "kubernetes_namespace" "consul_namespace" {
  metadata {
    name = "consul"
  }
}

resource "kubernetes_namespace" "vite_ma_planete_namespace" {
  metadata {
    name = "vite-ma-planete"
  }
}
