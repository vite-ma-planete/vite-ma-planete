resource "helm_release" "argocd" {
  name      = "argocd"
  namespace = kubernetes_namespace.argocd_namespace.metadata[0].name

  chart      = "argo-cd"
  repository = "https://argoproj.github.io/argo-helm"
}

resource "helm_release" "argocd-apps" {
  name      = "argocd-apps"
  namespace = kubernetes_namespace.argocd_namespace.metadata[0].name

  chart      = "argocd-apps"
  repository = "https://argoproj.github.io/argo-helm"

  values = [
    file("../../helm/argocd/applications.yaml")
  ]

  depends_on = [helm_release.argocd]
}
