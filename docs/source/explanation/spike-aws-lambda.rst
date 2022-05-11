Spike aws lambda
================

To deploy lambda with container for a new lambda, It probably not make sense!

.. mermaid::

    flowchart LR
        subgraph client
        end
        subgraph apigateway[api gateway]
        end
        subgraph lambda[aws lambda]
        end
        subgraph container[aws lambda container]
        end
        subgraph handler
            func("(event, context) => {}")
        end

        client -.http call.-> apigateway -.event.-> lambda -.http call.-> container -. invoke .-> handler

As you can see on above diagram, there are so many times data transformation.

.. mermaid::

    flowchart LR
        subgraph client
        end
        subgraph apigateway[api gateway]
        end
        subgraph lambda[aws lambda]
        end
        subgraph handler
            func("(event, context) => {}")
        end

        client -.http call.-> apigateway -. event .-> lambda -. invoke .-> handler

If we perform it with pure javascript, it looks much better, right?
