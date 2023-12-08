resource "helm_release" "sealed-secrets" {
  name      = "sealed-secrets"
  namespace = kubernetes_namespace.sealed_secrets_namespace.metadata[0].name

  chart      = "sealed-secrets"
  repository = "https://bitnami-labs.github.io/sealed-secrets"
}
