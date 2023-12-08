resource "kubernetes_namespace" "sealed-secrets-ns" {
  metadata {
    name = "sealed-secrets"
  }
}

resource "helm_release" "sealed-secrets" {
  chart      = "sealed-secrets"
  name       = "sealed-secrets"
  namespace  = "sealed-secrets"
  repository = "https://bitnami-labs.github.io/sealed-secrets"
}
